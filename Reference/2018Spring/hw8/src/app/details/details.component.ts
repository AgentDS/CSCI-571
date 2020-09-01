import { Component, OnInit, NgZone, EventEmitter, Output } from "@angular/core";
import { SearchService } from "../services/search.service";
import { Info } from "./info-tab/info";
import { DetailsService } from "../services/details.service";
import { Directions } from "./map-tab/direction";
import { FavoriteService } from "../services/favorite.service";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.css"]
})
export class DetailsComponent implements OnInit {
  private tabs = [
    { id: "info-tab", title: "Info" },
    { id: "photos-tab", title: "Photos" },
    { id: "map-tab", title: "Map" },
    { id: "reviews-tab", title: "Review" }
  ];

  @Output() slide = new EventEmitter<string>();
  details: any;

  private activeId = "info-tab";

  infoJson: Info;
  mapJson: Directions;
  photoJson: any;
  reviewJson: any;
  isFavorited: boolean;

  setActive(id) {
    this.activeId = id;
  }

  slideDetail() {
    this.slide.emit("right");
  }

  setFavorite() {
    this.zone.run(() => {
      if (this.isFavorited) {
        this.fService.removeFavorite(this.details.place_id);
        this.isFavorited = false;
      } else {
        this.fService.saveFavorite(
          this.details.name,
          this.details.vicinity,
          this.details.place_id,
          this.details.icon,
          this.details.place_id
        );
        this.isFavorited = true;
      }
    })
  }

  tweet() {
    let url = "https://twitter.com/intent/tweet?text=";
    url += `Check out ${this.details.name} at ${
      this.details.formatted_address
    }. Website: `;
    url += "&hashtags=TravelAndEntertainmentSearch";
    url += "&url=" + this.details.website;
    var newWin = window.open(url, "tweet", "height=600, width=600");
  }

  setInfo(data) {
    let tmpJson = new Info();
    if (data["formatted_address"]) {
      tmpJson.address = data["formatted_address"];
    }
    if (data["international_phone_number"]) {
      tmpJson.phoneNumber = data["international_phone_number"];
    }
    if (data["price_level"]) {
      tmpJson.priceLevel = data["price_level"];
    }
    if (data["rating"]) {
      tmpJson.rating = data["rating"];
    }
    if (data["url"]) {
      tmpJson.ggPage = data["url"];
    }
    if (data["website"]) {
      tmpJson.website = data["website"];
    }
    if (data["opening_hours"]) {
      tmpJson.hours = data["opening_hours"];
    }
    if (data["utc_offset"]) {
      tmpJson.utcOffset = data["utc_offset"];
    }
    this.infoJson = tmpJson;
  }

  setDirection(data) {
    let tmpJson = new Directions();
    data.geo.text = data.startLocation;
    tmpJson.start = data.geo;
    let endJson = data.geometry.location;
    endJson["text"] = data.name + ", " + data.formatted_address;
    tmpJson.end = endJson;
    this.mapJson = tmpJson;
  }

  setPhotos(data) {
    this.photoJson = data.photos;
  }

  setReview(data) {
    this.reviewJson = data.reviews;
  }

  constructor(
    private dService: DetailsService,
    private fService: FavoriteService,
    private zone: NgZone,
  ) {
    this.dService.details.subscribe(data => {
      this.zone.run(() => {
        this.details = data;
        this.setInfo(data);
        this.setDirection(data);
        this.setPhotos(data);
        this.setReview(data);
        this.isFavorited = this.fService.isFavorited([data["place_id"]])[0];
      });
    });
  }

  ngOnInit() {}
}

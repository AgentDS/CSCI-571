import {
  Component,
  OnInit,
  HostBinding,
  Output,
  EventEmitter,
  OnChanges,
  Input
} from "@angular/core";
import { SearchService } from "../services/search.service";
import { DetailsService } from "../services/details.service";
import { FavoriteService } from "../services/favorite.service";
import { error } from "selenium-webdriver";

declare var google: any;

@Component({
  selector: "app-result-table",
  templateUrl: "./result-table.component.html",
  styleUrls: ["./result-table.component.css"]
})
export class ResultTableComponent implements OnInit {
  @Output() slide = new EventEmitter<any>();

  showResult = false;
  resultJson = null;
  nextPage: any;
  prevPage: any = false;
  curPage = 1;
  service: any;
  @Input("place") selectedRow: any;
  geoJson: any;
  isFavorite: any;
  error: boolean = false;
  startLocation = "";

  constructor(
    private sService: SearchService,
    private dService: DetailsService,
    private fService: FavoriteService
  ) {
    this.sService.resultJson.subscribe(data => {
      console.log(data);
      if (data === null) {
        this.error = true;
        this.showResult = true;
      } else if (data === undefined) {
      }
      else if (data["status"] == 'ZERO_RESULTS') {
        this.resultJson = null;
        this.showResult = true;
      }
      else if(data == 'clear') {
        this.resultJson = null;
        this.showResult = true;
        this.selectedRow = null;
      }
       else {
        this.resultJson = data["results"];
        this.checkFavorite();
        this.nextPage = data["next_page_token"];
        this.geoJson = data["geoJson"];
        this.startLocation = data["startLocation"];
        this.error = false;
        this.showResult = true;
        
      }
      if (this.curPage == 1) {
        this.prevPage = false;
      } else {
        this.prevPage = true;
      }
    });
    this.fService.isStorageChange.subscribe(data => {
      this.checkFavorite();
    });
  }

  getNextPage() {
    this.curPage++;
    this.resultJson = 'loading';
    this.sService.getNextPage(this.nextPage);
  }

  getPrevPage() {
    this.curPage--;
    this.sService.getPrevPage();
    
  }

  highlightRow(placeId) {
    this.selectedRow = placeId;
  }

  showDetails() {
    this.slide.emit({ slide: "left", place: this.selectedRow });
  }

  getDetails(placeId) {
    this.highlightRow(placeId);
    this.dService.getDetails(placeId, this.startLocation, this.geoJson);
    this.slide.emit({ slide: "left", place: placeId });
  }

  setFavorite(index) {
    if (this.isFavorite[index]) {
      this.fService.removeFavorite(this.resultJson[index]["place_id"]);
      this.isFavorite[index] = false;
    } else {
      this.fService.saveFavorite(
        this.resultJson[index]["name"],
        this.resultJson[index]["vicinity"],
        this.resultJson[index]["place_id"],
        this.resultJson[index]["icon"],
        this.resultJson[index]["place_id"]
      );
      this.isFavorite[index] = true;
    }
  }

  checkFavorite() {
    if (this.resultJson) {
      let place_id_arr = this.resultJson.map(data => data.place_id);
      this.isFavorite = this.fService.isFavorited(place_id_arr);
    }
  }

  ngOnInit() {
    this.sService.loadSearchResult();
    this.curPage = 1;
  }
}

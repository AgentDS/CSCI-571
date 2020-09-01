import { Component, OnInit, Input, OnChanges, OnDestroy } from "@angular/core";
import { DetailsService } from "../../services/details.service";
import { Directions } from "./direction";
import { LoaderService } from "../../loader/loader.service";
import { SearchService } from "../../services/search.service";

declare var google: any;

@Component({
  selector: "app-map-tab",
  templateUrl: "./map-tab.component.html",
  styleUrls: ["./map-tab.component.css"]
})
export class MapTabComponent implements OnChanges, OnDestroy {
  @Input() directions: Directions;

  private marker: any;
  private map: any;
  private directionDisplay: any;
  private directionService: any;
  private geoAutocomplete: any;
  modeChosen: string = "DRIVING";
  startInput: string = "Your location";
  private myLocation: any;
  private panorama: any;
  buttonImgUrl: string = "http://cs-server.usc.edu:45678/hw/hw8/images/Pegman.png";
  modes = [
    { text: "Driving", value: "DRIVING" },
    { text: "Walking", value: "WALKING" },
    { text: "Bicycling", value: "BICYCLING" },
    { text: "Transit", value: "TRANSIT" }
  ];
  private placeLatLng: any;
  private geocoder = new google.maps.Geocoder();

  ngOnDestroy() {
    this.myLocation = null;
  }

  ngOnChanges() {
    this.startInput = this.directions.start.text || "Your location";
    document.getElementById("route-panel").innerHTML = "";
    this.setMap();
  }

  constructor(private loader: LoaderService, private sService: SearchService) {}

  setMap() {
    let lat = this.directions.end.lat();
    let lng = this.directions.end.lng();
    this.placeLatLng = new google.maps.LatLng(lat, lng);
    var mapOpt = {
      zoom: 13,
      center: this.placeLatLng,
      gestureHandling: "cooperative"
    };
    this.map = new google.maps.Map(document.getElementById("map"), mapOpt);
    this.marker = new google.maps.Marker({
      position: this.placeLatLng,
      map: this.map
    });
    this.directionService = new google.maps.DirectionsService();
    this.directionDisplay = new google.maps.DirectionsRenderer({
      panel: document.getElementById("route-panel")
    });
    this.directionDisplay.setMap(this.map);
    this.panorama = this.map.getStreetView();
    this.panorama.setPosition(this.placeLatLng);
    this.panorama.setVisible(false);
  }

  getAddressOnChange(event) {
    this.startInput = (<HTMLInputElement>document.getElementById(
      "dir-start"
    )).value;
  }

  showPanorama() {
    let flag = this.panorama.getVisible();
    if (flag) {
      this.panorama.setVisible(false);
      this.buttonImgUrl =
        "http://cs-server.usc.edu:45678/hw/hw8/images/Pegman.png";
    } else {
      this.panorama.setVisible(true);
      this.buttonImgUrl =
        "http://cs-server.usc.edu:45678/hw/hw8/images/Map.png";
    }
  }

  calcRoute(mode, startLatLng) {
    var request = {
      origin: startLatLng,
      destination: this.placeLatLng,
      travelMode: google.maps.TravelMode[mode],
      provideRouteAlternatives: true
    };
    this.directionService.route(request, (res, status) => {
      if (status == "OK") {
        this.marker.setMap(null);
        this.directionDisplay.setDirections(res);
      }
    });
    this.loader.hide();
  }

  onSubmit() {
    this.loader.show();

    if (
      this.startInput.toLowerCase() != "my location" &&
      this.startInput.toLowerCase() != "your location"
    ) {
      this.geocoder.geocode({ address: this.startInput }, (results, status) => {
        if (status == "OK") {
          this.calcRoute(this.modeChosen, results[0].geometry.location);
        } else {
          alert("Unable to get start geocode!");
        }
      });
    } else {
      if (!this.myLocation) {
        this.sService.getGeolocation().subscribe(data => {
          this.myLocation = {
            lat: data["lat"],
            lng: data["lon"]
          };
          let startLatLng = new google.maps.LatLng(
            this.myLocation.lat,
            this.myLocation.lng
          );
          this.calcRoute(this.modeChosen, startLatLng);
        });
      } else {
        let startLatLng = new google.maps.LatLng(
          this.myLocation.lat,
          this.myLocation.lng
        );
        this.calcRoute(this.modeChosen, startLatLng);
      }
    }
  }

  ngOnInit() {}
}

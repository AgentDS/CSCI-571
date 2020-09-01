import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { Info } from "../details/info-tab/info";
import { HttpHeaders, HttpClient, HttpParams } from "@angular/common/http";
import { LoaderService } from "../loader/loader.service";
import { API } from "../api";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};
declare var google: any;

@Injectable()
export class DetailsService {
  private _details = new Subject();
  details = this._details.asObservable();

  private _slide = new Subject();
  slide = this._slide.asObservable();

  private ggService;

  detailJson: any;

  constructor(private http: HttpClient, private loader: LoaderService) {
    let map = new google.maps.Map(document.createElement("div"));
    this.ggService = new google.maps.places.PlacesService(map);
  }

  getYelpReviews() {
    let addrComponent = this.detailJson.address_components;
    let tmpJson = {};
    addrComponent.map(data => {
      tmpJson[data.types[0]] = data.short_name;
    });
    let httpParams = new HttpParams()
      .set("name", this.detailJson.name)
      .set("city", tmpJson["locality"])
      .set("state", tmpJson["administrative_area_level_1"])
      .set("country", tmpJson["country"]);
    let address = "";
    address += tmpJson["street_number"] ? tmpJson["street_number"] : "";
    address += tmpJson["route"] ? " " + tmpJson["route"] : "";
    if (address) {
      httpParams = httpParams.set("address", address);
    }
    return this.http.get(API.yelpReview, { params: httpParams });
  }

  getDetails(place_id, start = "",geo = { }) {
    let req = {
      placeId: place_id
    };
    this.loader.show();
    this.ggService.getDetails(req, (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        this.loader.hide();
        this.setDetails(place, start, geo);
      }
    });
  }

  setDetails(data, start, geo) {
    let tmpJson = data;
    tmpJson["geo"] = geo;
    tmpJson['startLocation'] = start;
    this._details.next(tmpJson);
    this.detailJson = tmpJson;
  }
}

import { Injectable, EventEmitter, Output } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";
import { API } from "../api";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable()
export class SearchService {
  showResult = false;
  private _resultJson = new Subject();
  resultJson = this._resultJson.asObservable();
  service: any;
  private jsonData: any;
  private _detailsJson = new Subject();
  detailsJson = this._detailsJson.asObservable();

  private _isClear = new Subject();
  isClear = this._isClear.asObservable();

  private _isDataGet = new Subject();
  isDataget = this._isDataGet.asObservable();

  private _locationInput = new Subject();
  locationInput = this._isDataGet.asObservable();

  constructor(private http: HttpClient) {}

  private searchResults: any;
  private pageSaved: Array<string> = [];

  curPage = 1;

  search(form) {
    this.showResult = true;
    this.pageSaved.splice(0, this.pageSaved.length);
    let geo = form.geoJson;
    let location = form.location;
    if (!location) {
      location = "Your location";
    }
    let params = new HttpParams()
      .set("keyword", form.keyword)
      .set("category", form.category || "default")
      .set("distance", form.distance || "10")
      .set("isUserInput", form.isUserInput || false)
      .set("location", location)
      .set("geoJson", JSON.stringify(form.geoJson));

    let response = this.http.get(API.search, { params: params });

    response.subscribe(
      data => {
        this.jsonData = data;
        this.jsonData.geoJson = geo;
        this.jsonData.startLocation = location;
        this._resultJson.next(this.jsonData);
        this._isDataGet.next(true);
        this.searchResults = data["results"];
      },
      err => {
        this._resultJson.next(null);
      }
    );
  }

  loadSearchResult() {
    this._resultJson.next(this.jsonData);
  }

  getNextPage(pagetoken: string) {
    if (this.pageSaved.includes(pagetoken)) {
      let returnData: any = {};
      returnData.results = this.searchResults.slice(
        this.curPage * 20,
        (this.curPage + 1) * 20
      );
      if (this.curPage == 1) {
        returnData.next_page_token = this.pageSaved[1];
      }
      this._resultJson.next(returnData);
      console.log(this.pageSaved, returnData);
    } else {
      this.pageSaved.push(pagetoken);
      const params = new HttpParams().set("pagetoken", pagetoken)
      let response = this.http.get(
        API.nextpage, {params: params}
      );
      response.subscribe(data => {
        this._resultJson.next(data);
        this.searchResults = this.searchResults.concat(data["results"]);
      });
    }
    this.curPage++;
  }

  getPrevPage() {
    this.curPage--;
    let returnData: any = {};
    returnData.results = this.searchResults.slice(
      (this.curPage - 1) * 20,
      this.curPage * 20
    );
    returnData.next_page_token = this.pageSaved[this.curPage - 1];
    console.log(this.pageSaved, returnData);
    this._resultJson.next(returnData);
  }

  getGeolocation() {
    const url = "http://ip-api.com/json";
    return this.http.get(url);
  }

  clear() {
    this._resultJson.next("clear");
    this.jsonData = undefined;
    this._isClear.next(true);
    this.pageSaved.splice(0, this.pageSaved.length);
  }
}

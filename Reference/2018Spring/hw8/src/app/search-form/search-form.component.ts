import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef } from "@angular/core";
import { SearchForm } from "./search-form";
import { NgForm } from "@angular/forms/src/directives/ng_form";
import { SearchService } from "../services/search.service";

@Component({
  selector: "app-search-form",
  templateUrl: "./search-form.component.html",
  styleUrls: ["./search-form.component.css"]
})
export class SearchFormComponent implements OnInit {
  userLocation: Object;
  gotgeojson: boolean = false;
  category = "default";
  form = SearchForm;

  constructor(private sService: SearchService, private cdRef: ChangeDetectorRef) {}

  clear() {
    this.sService.clear();
    this.category = "default";
    this.form.isUserInput = false;
  }

  getAddressOnChange(event, location) {
    this.form.location = (<HTMLInputElement>document.getElementById('loc-input')).value;
  }

  getGeo() {
    this.sService.getGeolocation().subscribe(data => {
      this.userLocation = {
        lat: data["lat"],
        lng: data["lon"]
      };
      this.form.geoJson = this.userLocation;
      this.gotgeojson = true;
    });
  }

  onSubmit() {
    this.sService.search(this.form);
  }

  searchTypes = [
    "Default",
    "Airport",
    "Amusement Park",
    "Aquarium",
    "Art Gallery",
    "Bakery",
    "Bar",
    "Beauty Salon",
    "Bowling Alley",
    "Bus Station",
    "Cafe",
    "Campground",
    "Car Rental",
    "Casino",
    "Lodging",
    "Movie Theater",
    "Museum",
    "Night Club",
    "Park",
    "Parking",
    "Restaurant",
    "Shopping Mall",
    "Stadium",
    "Subway Station",
    "Taxi Stand",
    "Train Station",
    "Transit Station",
    "Travel Agency",
    "Zoo"
  ];

  ngOnInit() {
    this.getGeo();
  }
}

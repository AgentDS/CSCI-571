import { Component, OnChanges, ChangeDetectorRef, Input } from "@angular/core";
import { DetailsService } from "../../services/details.service";

@Component({
  selector: "app-photos-tab",
  templateUrl: "./photos-tab.component.html",
  styleUrls: ["./photos-tab.component.css"]
})
export class PhotosTabComponent implements OnChanges {
  @Input() photos: any;

  private displayWidth: number;

  private _resized = false;
  private col1 = [];
  private col2 = [];
  private col3 = [];
  private col4 = [];

  constructor() {}

  ngOnChanges() {
    if(!this.photos) {
      return;
    }
    
    this.displayWidth = window.screen.width;
    if(this.displayWidth > 600) {
      this.displayWidth = Math.round(this.displayWidth/4);
    }
    this.col1.splice(0, this.col1.length);
    this.col2.splice(0, this.col2.length);
    this.col3.splice(0, this.col3.length);
    this.col4.splice(0, this.col4.length);
    for (let i = 0; i < this.photos.length; i++) {
      switch (i % 4) {
        case 0: {
          this.col1.push(this.photos[i]);
          break;
        }
        case 1: {
          this.col2.push(this.photos[i]);
          break;
        }
        case 2: {
          this.col3.push(this.photos[i]);
          break;
        }
        case 3: {
          this.col4.push(this.photos[i]);
          break;
        }
      }
    }
  }

}

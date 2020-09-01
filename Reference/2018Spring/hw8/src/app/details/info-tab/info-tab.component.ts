import { Component, OnInit, OnChanges, Input } from "@angular/core";
import { Info } from "./info";
import { SearchService } from "../../services/search.service";
import { DetailsService } from "../../services/details.service";
import * as moment from "moment";

@Component({
  selector: "app-info-tab",
  templateUrl: "./info-tab.component.html",
  styleUrls: ["./info-tab.component.css"]
})
export class InfoTabComponent implements OnChanges {
  @Input() info: Info;
  private now: any;
  private day: any;
  private openTextMap = {
    true: "Open now: ",
    false: "Closed "
  };

  private priceLevelMap = ["", "$", "$$", "$$$", "$$$$", "$$$$$"];

  constructor() {}

  ngOnChanges() {
    if (this.info.hours) {
      this.now = moment.utc().utcOffset(this.info.utcOffset);
      this.day = this.now.day();
      let dayIndex = (this.day + 6) % 7;
      let tmp = this.info.hours.weekday_text;
      tmp = tmp
        .splice(0, dayIndex)
        .reverse()
        .concat(tmp.reverse());
      tmp.reverse();
      this.info.hours.weekday_text = tmp;
    }
  }
}

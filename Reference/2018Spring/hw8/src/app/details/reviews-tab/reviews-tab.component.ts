import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { DetailsService } from "../../services/details.service";
import { fadeInAnimation } from "../../fade-in.animation";
import * as moment from "moment";

@Component({
  selector: "app-reviews-tab",
  templateUrl: "./reviews-tab.component.html",
  styleUrls: ["./reviews-tab.component.css"],
  animations: [fadeInAnimation]
})
export class ReviewsTabComponent implements OnChanges {
  @Input() ggReviews: any;

  yelpReviews: any;
  reviewTypes = ["Google Reviews", "Yelp Reviews"];
  selectedReviewType: number = 0;
  error = false;

  ggReviewOrderPointer = [0, 1, 2, 3, 4];
  yelpReviewOrderPointer = [0, 1, 2];

  orderTypes = [
    "Default Order",
    "Highest Rating",
    "Lowest Rating",
    "Most Recent",
    "Least Recent"
  ];

  setDefaultOrder() {
    this.ggReviewOrderPointer.sort();
    this.yelpReviewOrderPointer.sort();
  }

  mapOrder(pointers, review, key) {
    pointers.sort((a, b) => {
      if (review[a][key] > review[b][key]) {
        return 1;
      } else {
        return -1;
      }
    });
  }

  setHighestRating() {
    this.mapOrder(this.ggReviewOrderPointer, this.ggReviews, "rating");
    this.ggReviewOrderPointer.reverse();
    if (this.yelpReviews) {
      this.mapOrder(this.yelpReviewOrderPointer, this.yelpReviews, "rating");
      this.yelpReviewOrderPointer.reverse();
    }
  }

  setLowestRating() {
    this.mapOrder(this.ggReviewOrderPointer, this.ggReviews, "rating");
    if (this.yelpReviews) {
      this.mapOrder(this.yelpReviewOrderPointer, this.yelpReviews, "rating");
    }
  }

  setMostRecent() {
    this.mapOrder(this.ggReviewOrderPointer, this.ggReviews, "time");
    this.ggReviewOrderPointer.reverse();
    if (this.yelpReviews) {
      this.mapOrder(
        this.yelpReviewOrderPointer,
        this.yelpReviews,
        "time_created"
      );
      this.yelpReviewOrderPointer.reverse();
    }
  }

  setLeastRecent() {
    this.mapOrder(this.ggReviewOrderPointer, this.ggReviews, "time");
    if (this.yelpReviews) {
      this.mapOrder(
        this.yelpReviewOrderPointer,
        this.yelpReviews,
        "time_created"
      );
    }
  }

  ngOnChanges() {
    this.ggReviewOrderPointer = Array.from(Array(this.ggReviews.length).keys());
  }

  selectedOrderType: number = 0;

  setReviewType(type) {
    this.selectedReviewType = type;
    this.error = false;
    if (this.yelpReviews === undefined) {
      let response = this.dService.getYelpReviews();
      response.subscribe(
        data => {
          this.yelpReviews = data;
          this.yelpReviewOrderPointer = Array.from(
            Array(this.yelpReviews.length).keys()
          );
          this.setOrderType(this.selectedOrderType);
        },
        err => {
          this.error = true;
        }
      );
    }
  }

  setOrderType(type) {
    this.selectedOrderType = type;
    switch (type) {
      case 0: {
        this.setDefaultOrder();
        return;
      }
      case 1: {
        this.setHighestRating();
        return;
      }
      case 2: {
        this.setLowestRating();
        return;
      }
      case 3: {
        this.setMostRecent();
        return;
      }
      case 4: {
        this.setLeastRecent();
      }
    }
  }

  constructor(private dService: DetailsService) {}

  ngOnInit() {}
}

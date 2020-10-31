import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { BackendService } from '../backend.service';



import { NewsDetailComponent } from "../news-detail/news-detail.component";

import { Metadata } from '../metadata';
import { Latestprice } from '../latestprice';
import { News } from '../news';
import { NewsSource } from '../news-source';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  ticker: string = '';
  metadata;
  latestprice;
  currentTimeLA: string;
  localCurrentTime: number;
  change: number;
  changePercent: number;
  lasttimestamp;
  allnews;
  openstatus = false;

  getCurrentTime() {
    this.localCurrentTime = Date.now();
  }

  constructor(
    private route: ActivatedRoute,
    private backendService: BackendService,
    private newsModalService: NgbModal
  ) {}

  openNewsDetail(news: News) {
    const newsModalRef = this.newsModalService.open(NewsDetailComponent);
    newsModalRef.componentInstance.news = news;
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.ticker = params.get('ticker');
      console.log('ticker name in details: ' + this.ticker);
    });

    this.backendService.fetchMetadata(this.ticker).subscribe((metadata) => {
      this.metadata = metadata;
      console.log('Metadata fetched ' + Date());
      // console.log(this.metadata);
    });
    // console.log(this.metadata);

    this.backendService
      .fetchLatestPrice(this.ticker)
      .subscribe((latestprice) => {
        this.latestprice = latestprice;
        this.change = this.latestprice.last - this.latestprice.prevClose;
        this.changePercent = (100 * this.change) / this.latestprice.prevClose;
        this.lasttimestamp = new Date(this.latestprice.timestamp);
        this.getCurrentTime();
        let timeDifference = this.localCurrentTime - this.lasttimestamp;
        console.log("Time difference:" + timeDifference/1000 + "s");

        if (timeDifference < 60 * 1000) {
          this.openstatus = true;
        } else {
          this.openstatus = false;
        }

        console.log('LatestPrice fetched ' + Date());
        // console.log(this.lasttimestamp);
      });

    this.backendService.fetchNews(this.ticker).subscribe((allnews) => {
      this.allnews = allnews;
      console.log('News fetched ' + Date());

      // console.log(this.allnews);
    });
  }
}

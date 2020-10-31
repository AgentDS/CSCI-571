import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { BackendService } from '../backend.service';

import { NewsDetailComponent } from '../news-detail/news-detail.component';

import { Metadata } from '../metadata';
import { Latestprice } from '../latestprice';
import { News } from '../news';
import { NewsSource } from '../news-source';
import { DailyPrice } from '../daily-price';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  ticker: string = '';
  metadata;
  latestprice;
  dailycharts;
  currentTimeLA: string;
  localCurrentTime: number;
  change: number;
  changePercent: number;
  lasttimestamp;
  allnews;
  openstatus = false;
  tickerExist = true;

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

  fetchMetadata() {
    this.backendService.fetchMetadata(this.ticker).subscribe((metadata) => {
      this.metadata = metadata;
      if (this.metadata.ticker) {
        this.tickerExist = true;
      } else {
        this.tickerExist = false;
      }
      console.log('Metadata fetched ' + Date());
      // console.log(this.metadata);
    });
  }

  fetchNews() {
    this.backendService.fetchNews(this.ticker).subscribe((allnews) => {
      this.allnews = allnews;
      console.log('News fetched ' + Date());
    });
  }

  fetchLatestPriceNDailyCharts() {
    this.backendService
      .fetchLatestPrice(this.ticker)
      .subscribe((latestprice) => {
        this.latestprice = latestprice;
        if (this.latestprice.last) {
          this.tickerExist = true;
          this.change = this.latestprice.last - this.latestprice.prevClose;
          this.changePercent = (100 * this.change) / this.latestprice.prevClose;
          this.lasttimestamp = new Date(this.latestprice.timestamp);
          this.getCurrentTime();
          let timeDifference = this.localCurrentTime - this.lasttimestamp;
          console.log('Time difference:' + timeDifference / 1000 + 's');

          if (timeDifference < 60 * 1000) {
            this.openstatus = true;
          } else {
            this.openstatus = false;
          }

          // last working day can be achieve from last timestamp
          let lastWorkingDate = this.latestprice.timestamp.slice(0, 10);
          this.backendService
            .fetchDailyCharts(this.ticker, lastWorkingDate)
            .subscribe((dailycharts) => {
              this.dailycharts = dailycharts;
              // console.log(this.dailycharts);
              console.log('DailyCharts fetched ' + Date());
            });
        } else {
          this.tickerExist = false;
          this.dailycharts = { detail: 'Not found.' };
        }

        console.log('LatestPrice fetched ' + Date());
      });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.ticker = params.get('ticker');
      console.log('ticker name in details: ' + this.ticker);
    });

    this.fetchMetadata();
    this.fetchNews();
    this.fetchLatestPriceNDailyCharts();
  }
}

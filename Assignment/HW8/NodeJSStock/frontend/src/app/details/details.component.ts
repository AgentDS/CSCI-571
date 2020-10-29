import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BackendService } from '../backend.service';

import { Metadata } from '../metadata';
import { Latestprice } from '../latestprice';

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

  getCurrentTime() {
    this.localCurrentTime = Date.now();
  }

  constructor(
    private route: ActivatedRoute,
    private backendService: BackendService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.ticker = params.get('ticker');
      console.log('ticker name in details: ' + this.ticker);
    });

    this.backendService.fetchMetadata(this.ticker).subscribe((metadata) => {
      this.metadata = metadata;
      console.log(this.metadata);
    });
    // console.log(this.metadata);
    this.getCurrentTime();

    this.backendService
      .fetchLatestPrice(this.ticker)
      .subscribe((latestprice) => {
        this.latestprice = latestprice;
        this.change = this.latestprice.last - this.latestprice.prevClose;
        this.changePercent = (100 * this.change) / this.latestprice.prevClose;
        console.log(this.latestprice);
      });
  }
}

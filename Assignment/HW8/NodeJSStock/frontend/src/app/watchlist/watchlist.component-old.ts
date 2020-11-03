import { Component, OnInit } from '@angular/core';
import { interval, Subject, Subscription, timer, forkJoin } from 'rxjs';
import { switchMap, takeWhile, map } from 'rxjs/operators';

import { BackendService } from '../backend.service';

import { Latestprice } from '../latestprice';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css'],
})
export class WatchlistComponent implements OnInit {
  isEmpty;
  tmpArr = [];
  watchlistArr;
  tickerInfoArr; // array of LatestPrice objects, obtained from latest price fetch
  fetchFinish = false;
  fetchSubscribe;

  constructor(private backendService: BackendService) {}

  fetchAllTicker() {
    let stop: boolean = false;
    console.log('Start fetch ' + Date());

    this.fetchSubscribe = interval(15000)
      .pipe(takeWhile(() => !stop))
      .subscribe(() => {
        console.log('real Start fetch ' + Date());
        this.checkEmpty();
        this.watchlistArr.map((item) =>
          this.backendService
            .fetchLatestPrice(item.ticker)
            .subscribe((latestprice: Latestprice) => {
              let tickerInfo = {
                ticker: latestprice.ticker,
                name: item.name,
                change: latestprice.last - latestprice.prevClose,
                changePercent:
                  (100 * (latestprice.last - latestprice.prevClose)) /
                  latestprice.prevClose,
              };
              this.tmpArr.push(tickerInfo);
              console.log(this.tmpArr.length + ' items: ' + Date());

              // console.log(this.tmpArr);
              // console.log(latestprice);
            })
        );
        this.tickerInfoArr = this.tmpArr;
        this.tmpArr = [];
        if (this.tickerInfoArr.length) {
          this.fetchFinish = true;
        }
      });
  }

  checkEmpty() {
    this.watchlistArr = localStorage.getItem('Watchlist')
      ? JSON.parse(localStorage.getItem('Watchlist'))
      : [];
    if (this.watchlistArr.length) {
      this.isEmpty = false;
    } else {
      this.isEmpty = true;
    }
  }
  ngOnInit() {
    this.fetchAllTicker();
  }

  ngOnDestroy() {
    this.fetchSubscribe.unsubscribe();
    console.log('Exist from Watchlist');
  }
}

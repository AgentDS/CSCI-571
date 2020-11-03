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
  watchlistArr;
  tickerInfoArr; // array of LatestPrice objects, obtained from latest price fetch
  fetchFinish = false;
  fetchSubscribe;

  constructor(private backendService: BackendService) {}

  fetchAllTicker() {
    let stop: boolean = false;
    this.fetchSubscribe = interval(15000)
      .pipe(takeWhile(() => !stop))
      .subscribe(() => {
        this.checkEmpty();
        this.watchlistArr.map((item) =>
          this.backendService
            .fetchLatestPrice(item.ticker)
            .subscribe((latestprice: Latestprice) => {
              console.log(latestprice);
            })
        );
        // this.fetchFinish = true;
        // console.log(this.tickerInfoArr);
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

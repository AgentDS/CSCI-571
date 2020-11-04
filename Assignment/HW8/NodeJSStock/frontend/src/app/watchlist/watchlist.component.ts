import { Component, OnInit } from '@angular/core';
import { interval, Subject, Subscription, timer, forkJoin } from 'rxjs';
import { switchMap, takeWhile, map, last } from 'rxjs/operators';

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
  fetchSubscribe: Subscription;

  constructor(private backendService: BackendService) {}

  fetchAllTicker() {
    let stop: boolean = false;
    console.log('Start fetch ' + Date());

    this.fetchSubscribe = timer(0, 15000).subscribe(() => {
      this.checkEmpty();
      let callArr = [];
      this.watchlistArr.forEach((item) => {
        callArr.push(this.backendService.fetchLatestPrice(item.ticker));
      });
      forkJoin(callArr).subscribe((responses) => {
        console.log('real fetch time: ' + Date());
        let infoArr = [];
        responses.forEach((res: Latestprice) => {
          let tickerName = this.watchlistArr.filter(
            (data) => data.ticker === res.ticker
          )[0].name;
          let info = {
            ticker: res.ticker,
            name: tickerName,
            last: res.last,
            change: res.last - res.prevClose,
            changePercent: (100 * (res.last - res.prevClose)) / res.prevClose,
            timestamp: res.timestamp
          };
          infoArr.push(info);
        });
        this.tickerInfoArr = infoArr;
        this.fetchFinish = true;
        console.log(this.tickerInfoArr);
      });
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

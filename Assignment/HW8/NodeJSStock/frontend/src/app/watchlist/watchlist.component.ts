import { Component, OnInit } from '@angular/core';
import { Subject, Subscription, timer, forkJoin } from 'rxjs';

import { BackendService } from '../backend.service';

import { Latestprice } from '../latestprice';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css'],
})
export class WatchlistComponent implements OnInit {
  isEmpty;
  tickerCache: any[];
  watchlistArr;
  tickerInfoArr; // array of LatestPrice objects, obtained from latest price fetch
  fetchFinish = false;
  fetchSubscribe: Subscription;

  constructor(private backendService: BackendService) {}

  fetchAllTicker() {
    let stop: boolean = false;
    console.log('Start fetch ' + Date());

    this.fetchSubscribe = timer(0, 1500000).subscribe(() => {
      this.checkEmpty();
      let callArr = [];
      this.watchlistArr.forEach((item) => {
        callArr.push(this.backendService.fetchLatestPrice(item.ticker));
      });
      forkJoin(callArr).subscribe((responses) => {
        console.log('real fetch time: ' + Date());
        let infoArr = [];
        console.log('Response in forkJoin: ' + responses);

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
            timestamp: res.timestamp,
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
    let tickerCache = [];
    this.watchlistArr = localStorage.getItem('Watchlist')
      ? JSON.parse(localStorage.getItem('Watchlist'))
      : [];
    if (this.watchlistArr.length) {
      this.isEmpty = false;
      for (let j = 0; j < this.watchlistArr.length; j++) {
        tickerCache.push(true);
      }
      this.tickerCache = tickerCache;
    } else {
      this.isEmpty = true;
    }
  }

  public removeFromWatchlist(ticker, tickerId) {
    this.tickerCache[tickerId] = false;
    let watchlistArrOld = JSON.parse(localStorage.getItem('Watchlist'));
    let watchlistArrNew = watchlistArrOld.filter(
      (data) => data.ticker != ticker.toUpperCase()
    );
    localStorage.setItem('Watchlist', JSON.stringify(watchlistArrNew));
    this.checkEmpty();
  }

  ngOnInit() {
    this.fetchAllTicker();
  }

  ngOnDestroy() {
    this.fetchSubscribe.unsubscribe();
    console.log('Exist from Watchlist');
  }
}

import { Component, OnInit } from '@angular/core';
import { Subject, Subscription, timer, forkJoin } from 'rxjs';

import { BackendService } from '../backend.service';

import { Latestprice } from '../latestprice';

let mockInfoArr = [
  {
    ticker: 'AAPL',
    name: 'Apple company',
    last: 122.5,
    change: 23.4,
    changePercent: 2.34,
    timestamp: '125456',
  },
  {
    ticker: 'AAA',
    name: 'AAA Cor',
    last: 121.34,
    change: -2.4,
    changePercent: -0.34,
    timestamp: '125456',
  },
  {
    ticker: '3ADDDY',
    name: 'Adidas Cor',
    last: 227.12,
    change: -44.4,
    changePercent: -1.54,
    timestamp: '125456',
  },
  {
    ticker: '4PUMA',
    name: 'PUMA Sports',
    last: 11.34,
    change: 2.4,
    changePercent: 1.34,
    timestamp: '125456',
  },
];

function addLocalStorage() {
  let watchedItems = [
    { ticker: '1AAPL', name: 'Apple company' },
    { ticker: '2AAA', name: 'AAA Cor' },
    { ticker: '3ADDDY', name: 'Adidas Cor' },
    { ticker: '4PUMA', name: 'PUMA Sports' },
  ];
  localStorage.setItem('Watchlist', JSON.stringify(watchedItems));
}

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

    this.fetchSubscribe = timer(0, 15000).subscribe(() => {
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
    this.watchlistArr = localStorage.getItem('Watchlist')
      ? JSON.parse(localStorage.getItem('Watchlist'))
      : [];
    if (this.watchlistArr.length) {
      this.isEmpty = false;
    } else {
      this.isEmpty = true;
    }
  }

  public removeFromWatchlist(tickerItem) {
    this.tickerInfoArr.splice(this.tickerInfoArr.indexOf(tickerItem), 1);
    let watchlistArrOld = JSON.parse(localStorage.getItem('Watchlist'));
    let watchlistArrNew = watchlistArrOld.filter(
      (data) => data.ticker != tickerItem.ticker.toUpperCase()
    );
    localStorage.setItem('Watchlist', JSON.stringify(watchlistArrNew));
    this.checkEmpty();
  }

  ngOnInit() {
    this.fetchAllTicker();  // TODO: remove comment after testing

    // for style testing-----Start
    // console.log("Init Watchlist");
    // addLocalStorage();
    // this.checkEmpty();
    // this.tickerInfoArr = mockInfoArr;
    // this.fetchFinish = true;
    // console.log("In watchlist");
    // for testing-----End
  }

  ngOnDestroy() {
    this.fetchSubscribe.unsubscribe();
    console.log('Exist from Watchlist');
  }
}

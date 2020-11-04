import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription, timer, forkJoin } from 'rxjs';

import { BackendService } from '../backend.service';

import { Latestprice } from '../latestprice';

// stockItem in localStorage: {
//   ticker: string,
//   name: string,
//   quantity: number, // positive
//   totalCost: number  // no need for avgCost = totalCost / quantity
// }

// inforItem for display: {
// ticker: string,
// name: string,
// quantity: number,
// totalCost: number,
// avgCost: number,  // totalCost / quantity
// change: number, // latestprice.last - totalCost / quantity
// currentPrice: number, // latestprice.last
// marketValue: number, // latestprice.last * quantity
// }

let mockInfoArr = [
  {
    ticker: 'AAPL',
    name: 'Apple company',
    quantity: 100,
    totalCost: 3541,
    avgCost: 3541 / 100,
    change: 123 - 3541 / 100,
    currentPrice: 123, // latestprice.last
    marketValue: 123 * 100,
  },
  {
    ticker: 'AAA',
    name: 'AAA Cor',
    quantity: 200,
    totalCost: 12441,
    avgCost: 12441 / 200,
    change: 52 - 12441 / 200,
    currentPrice: 52, // latestprice.last
    marketValue: 52 * 200,
  },
  {
    ticker: 'ADDDY',
    name: 'Adidas Cor',
    quantity: 300,
    totalCost: 341,
    avgCost: 341 / 300,
    change: 34.1 - 341 / 300,
    currentPrice: 34.1,
    marketValue: 34.1 * 300,
  },
  {
    ticker: 'PUMA',
    name: 'PUMA Sports',
    quantity: 400,
    totalCost: 65040,
    avgCost: 65040 / 400,
    change: 34.1 - 65040 / 400,
    currentPrice: 102334.12,
    marketValue: 102334.12 * 400,
  },
];

function addLocalStorage() {
  let purchasedItems = [
    { ticker: 'AAPL', name: 'Apple company', quantity: 100, totalCost: 3541 },
    { ticker: 'AAA', name: 'AAA Cor', quantity: 200, totalCost: 12441 },
    { ticker: 'ADDDY', name: 'Adidas Cor', quantity: 300, totalCost: 341 },
    { ticker: 'PUMA', name: 'PUMA Sports', quantity: 400, totalCost: 65040 },
  ];
  localStorage.setItem('Portfolio', JSON.stringify(purchasedItems));
}

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
})
export class PortfolioComponent implements OnInit {
  portfolioArr;
  isEmpty;
  tickerInfoArr; // array for display, obtained from latest price fetch and other caculation
  fetchFinish = false;
  fetchSubscribe: Subscription;

  constructor(private backendService: BackendService) {}

  fetchAllTicker() {
    console.log('Start fetch ' + Date());
    this.fetchSubscribe = timer(0, 1500000).subscribe(() => {
      this.checkEmpty();
      let callArr = [];
      this.portfolioArr.forEach((item) => {
        callArr.push(this.backendService.fetchLatestPrice(item.ticker));
      });
      forkJoin(callArr).subscribe((responses) => {
        console.log('real fetch time: ' + Date());
        console.log('Response in forkJoin: ' + responses);

        let infoArr = [];
        responses.forEach((res: Latestprice) => {
          let tmpItem = this.portfolioArr.filter(
            (data) => data.ticker === res.ticker
          )[0];
          let avgcst = tmpItem.totalCost / tmpItem.quantity;
          let info = {
            ticker: res.ticker,
            name: tmpItem.name,
            quantity: tmpItem.quantity,
            totalCost: tmpItem.totalCost,
            avgCost: avgcst, // totalCost / quantity
            change: avgcst - res.last, // totalCost / quantity - latestprice.last
            currentPrice: res.last, // latestprice.last
            marketValue: res.last * tmpItem.quantity, // latestprice.last * quantity
          };
          infoArr.push(info);
        });
        this.tickerInfoArr = infoArr;
        this.fetchFinish = true;
        console.log(this.tickerInfoArr);
      });
    });
  }

  public removeFromPortfolio(tickerItem) {
    this.tickerInfoArr.splice(this.tickerInfoArr.indexOf(tickerItem), 1);
    let portfolioArrOld = JSON.parse(localStorage.getItem('Portfolio'));
    let portfolioArrNew = portfolioArrOld.filter(
      (data) => data.ticker != tickerItem.ticker.toUpperCase()
    );
    localStorage.setItem('Portfolio', JSON.stringify(portfolioArrNew));
    this.checkEmpty();
  }

  checkEmpty() {
    this.portfolioArr = localStorage.getItem('Portfolio')
      ? JSON.parse(localStorage.getItem('Portfolio'))
      : [];
    if (this.portfolioArr.length) {
      this.isEmpty = false;
    } else {
      this.isEmpty = true;
    }
  }

  ngOnInit() {
    console.log('Open Portfolio');
    // this.fetchAllTicker(); // TODO: remove comment after testing

    // for style testing-----Start
    console.log('Init Watchlist');
    addLocalStorage();
    this.checkEmpty();
    this.tickerInfoArr = mockInfoArr;
    this.fetchFinish = true;
    // for testing-----End
  }

  ngOnDestroy(): void {
    // this.fetchSubscribe.unsubscribe();  // TODO: remove comment after testing
    console.log('Exist from Portfolio');
  }
}

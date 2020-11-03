import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { interval, Subject, Subscription, timer } from 'rxjs';
import { switchMap, debounceTime, takeWhile } from 'rxjs/operators';
import * as Highcharts from 'highcharts/highstock';
// import VBPIndicator from 'highcharts/indicators/volume-by-price';  // ????? import name unknown
// import IndicatorsCore from "highcharts/indicators/indicators";
import { Options } from 'highcharts/highstock';
declare var require: any;
require('highcharts/indicators/indicators')(Highcharts); // loads core and enables sma
require('highcharts/indicators/volume-by-price')(Highcharts); // loads enables vbp

import * as moment from 'moment';
import 'moment-timezone';

import { BackendService } from '../backend.service';

import { NewsDetailComponent } from '../news-detail/news-detail.component';

import { Metadata } from '../metadata';
import { Latestprice } from '../latestprice';
import { News } from '../news';
import { NewsSource } from '../news-source';
import { DailyPrice } from '../daily-price';
import { HistPrice } from '../hist-price';
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';

/**
 * Use moment-timezone.js to return the timezone offset for individual
 * timestamps, used in the X axis labels and the tooltip header.
 */
function LATimezonOffset(timestamp) {
  var zone = 'America/Los_Angeles',
    timezoneOffset = -moment.tz(timestamp, zone).utcOffset();

  return timezoneOffset;
}

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  private _StarAlertSuccess = new Subject<string>();
  fetchSubscribe; // for unsubscribe interval() on ngDestroy()
  starSuccessMessage = '';
  ticker: string = '';
  metadata;
  latestprice;
  dailycharts;
  histcharts;
  currentTimeLA: string;
  localCurrentTime: number;
  change: number;
  changePercent: number;
  lasttimestamp;
  allnews;
  openstatus = false;
  dailyChartsColor;
  tickerExist = true;
  inWatchlist = false; // if false, not in watchlist; otherwise in watchlist

  // high charts setting area
  dailyChartsFinish = false;
  histChartsFinish = false;
  isHighcharts = typeof Highcharts === 'object';
  chartConstructor = 'stockChart';
  Highcharts: typeof Highcharts = Highcharts; // required

  dailyChartOptions: Options;
  histChartOptions: Options;

  createDailyCharts() {
    // split the data set into close and volume
    let dailyClose = [],
      dataLength = this.dailycharts.length;
    let i, intTimestamp;

    for (i = 0; i < dataLength; i += 1) {
      intTimestamp = Date.parse(this.dailycharts[i].date);
      dailyClose.push([intTimestamp, this.dailycharts[i].close]);
    }

    this.dailyChartOptions = {
      series: [
        {
          data: dailyClose,
          color: this.dailyChartsColor,
          showInNavigator: true,
          name: this.ticker.toUpperCase(),
          type: 'line',
          tooltip: {
            valueDecimals: 2,
          },
        },
      ],
      title: { text: this.ticker.toUpperCase() },
      rangeSelector: {
        enabled: false,
      },
      navigator: {
        series: {
          type: 'area',
          color: this.dailyChartsColor,
          fillOpacity: 1,
        },
      },
      time: {
        getTimezoneOffset: LATimezonOffset,
      },
    }; // required
  }

  createHistCharts() {
    let i, intTimestamp;

    // split the data set into ohlc and volume
    let ohlc = [],
      volume = [],
      dataLength = this.histcharts.length,
      // set the allowed units for data grouping
      groupingUnits = [
        [
          'week', // unit name
          [1], // allowed multiples
        ],
        ['month', [1, 2, 3, 4, 6]],
      ];

    for (i = 0; i < dataLength; i += 1) {
      intTimestamp = Date.parse(this.histcharts[i].date);
      ohlc.push([
        intTimestamp, // the date
        this.histcharts[i].open, // open
        this.histcharts[i].high, // high
        this.histcharts[i].low, // low
        this.histcharts[i].close, // close
      ]);

      volume.push([
        intTimestamp, // the date
        this.histcharts[i].volume, // the volume
      ]);
    }

    this.histChartOptions = {
      series: [
        {
          type: 'candlestick',
          name: this.ticker.toUpperCase(),
          id: this.ticker,
          zIndex: 2,
          data: ohlc,
        },
        {
          type: 'column',
          name: 'Volume',
          id: 'volume',
          data: volume,
          yAxis: 1,
        },
        {
          type: 'vbp',
          linkedTo: this.ticker,
          params: {
            volumeSeriesID: 'volume',
          },
          dataLabels: {
            enabled: false,
          },
          zoneLines: {
            enabled: false,
          },
        },
        {
          type: 'sma',
          linkedTo: this.ticker,
          zIndex: 1,
          marker: {
            enabled: false,
          },
        },
      ],
      title: { text: this.ticker.toUpperCase() + ' Historical' },
      subtitle: {
        text: 'With SMA and Volume by Price technical indicators',
      },
      yAxis: [
        {
          startOnTick: false,
          endOnTick: false,
          labels: {
            align: 'right',
            x: -3,
          },
          title: {
            text: 'OHLC',
          },
          height: '60%',
          lineWidth: 2,
          resize: {
            enabled: true,
          },
        },
        {
          labels: {
            align: 'right',
            x: -3,
          },
          title: {
            text: 'Volume',
          },
          top: '65%',
          height: '35%',
          offset: 0,
          lineWidth: 2,
        },
      ],
      tooltip: {
        split: true,
      },
      plotOptions: {
        // series: {
        //   dataGrouping: {
        //     units: groupingUnits,
        //   },
        // },
      },
      rangeSelector: {
        buttons: [
          {
            type: 'month',
            count: 1,
            text: '1m',
          },
          {
            type: 'month',
            count: 3,
            text: '3m',
          },
          {
            type: 'month',
            count: 6,
            text: '6m',
          },
          {
            type: 'ytd',
            text: 'YTD',
          },
          {
            type: 'year',
            count: 1,
            text: '1y',
          },
          {
            type: 'all',
            text: 'All',
          },
        ],
        selected: 2,
      },
      time: {
        getTimezoneOffset: LATimezonOffset,
      },
    }; // required
  }

  // chartCallback: Highcharts.ChartCallbackFunction = function (chart) { ... } // optional function, defaults to null
  // updateFlag: boolean = false; // optional boolean
  // oneToOneFlag: boolean = true; // optional boolean, defaults to false
  // runOutsideAngular: boolean = false; // optional boolean, defaults to false

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
    // update data every 15 seconds
    let stop: boolean = false;
    this.fetchSubscribe = interval(15000)
      .pipe(takeWhile(() => !stop))
      .subscribe(() => {
        this.backendService
          .fetchLatestPrice(this.ticker)
          .subscribe((latestprice) => {
            this.latestprice = latestprice;
            if (this.latestprice.last) {
              this.tickerExist = true;
              this.change = this.latestprice.last - this.latestprice.prevClose;
              if (this.change > 0) {
                this.dailyChartsColor = '#008000';
              } else {
                this.dailyChartsColor = '#FF0000';
              }
              this.changePercent =
                (100 * this.change) / this.latestprice.prevClose;
              this.lasttimestamp = new Date(this.latestprice.timestamp);
              this.getCurrentTime();
              let timeDifference = this.localCurrentTime - this.lasttimestamp;
              // console.log('Time difference:' + timeDifference / 1000 + 's');

              if (timeDifference < 60 * 1000) {
                this.openstatus = true;
              } else {
                this.openstatus = false;
              }

              // last working day can be achieve from last timestamp
              let lastWorkingDate = this.latestprice.timestamp.slice(0, 10);
              console.log('Last working date: ' + lastWorkingDate);
              this.backendService
                .fetchDailyCharts(this.ticker, lastWorkingDate)
                .subscribe((dailycharts) => {
                  this.dailycharts = dailycharts;
                  console.log('DailyCharts fetched ' + Date());
                  console.log('DailyCharts length: ' + this.dailycharts.length);
                  this.dailyChartsFinish = false;
                  this.createDailyCharts();
                  this.dailyChartsFinish = true;
                  console.log('DailyCharts created ' + Date());
                });
            } else {
              this.tickerExist = false;
              this.dailycharts = { detail: 'Not found.' };
            }

            console.log('LatestPrice fetched ' + Date());
          });
      });
  }

  fetchHistCharts() {
    let crtTime = new Date();
    let year = crtTime.getFullYear();
    let month = crtTime.getMonth();
    let day = crtTime.getDate();
    let twoYearBack = new Date(year - 2, month, day);
    let histStartDate = twoYearBack.toISOString().slice(0, 10); // 2 years before current date
    console.log('Two years before today: ' + histStartDate);

    this.backendService
      .fetchHistCharts(this.ticker, histStartDate)
      .subscribe((histcharts) => {
        this.histcharts = histcharts;
        console.log('HistCharts fetched ' + Date());
        console.log('HistCharts length: ' + this.histcharts.length);
        this.histChartsFinish = false;
        this.createHistCharts();
        this.histChartsFinish = true;
        console.log('HistCharts created ' + Date());
      });
  }

  checkWatchlist() {
    let watchlistArr = localStorage.getItem('Watchlist')
      ? JSON.parse(localStorage.getItem('Watchlist'))
      : [];
    let result = watchlistArr.filter(
      (data) => data.ticker === this.ticker.toUpperCase()
    );
    if (result.length) {
      this.inWatchlist = true;
    } else {
      this.inWatchlist = false;
    }
  }

  public onClickStar() {
    this.inWatchlist = !this.inWatchlist;
    let watchlistArr, watchlistArrNew;

    watchlistArr = localStorage.getItem('Watchlist')
      ? JSON.parse(localStorage.getItem('Watchlist'))
      : [];
    if (this.inWatchlist) {
      // add ticker to watchlist
      let watchlistItemNew = {
        ticker: this.ticker.toUpperCase(),
        name: this.metadata.name,
      };
      watchlistArr.push(watchlistItemNew);
      localStorage.setItem('Watchlist', JSON.stringify(watchlistArr));
    } else {
      // remove ticker from watchlist
      watchlistArrNew = watchlistArr.filter(
        (data) => data.ticker != this.ticker.toUpperCase()
      );
      localStorage.setItem('Watchlist', JSON.stringify(watchlistArrNew));
    }
    this._StarAlertSuccess.next('Message successfully changed.');
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.ticker = params.get('ticker');
      console.log('ticker name in details: ' + this.ticker);
    });
    this.checkWatchlist();

    this.fetchMetadata();
    this.fetchNews();
    this.fetchLatestPriceNDailyCharts();
    this.fetchHistCharts();

    // for star alert
    this._StarAlertSuccess.subscribe(
      (message) => (this.starSuccessMessage = message)
    );
    this._StarAlertSuccess
      .pipe(debounceTime(5000))
      .subscribe(() => (this.starSuccessMessage = ''));
  }

  ngOnDestroy() {
    this.fetchSubscribe.unsubscribe();
    console.log(`Exist from Details/${this.ticker}`);
  }
}

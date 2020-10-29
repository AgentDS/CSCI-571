import { Host, Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { catchError, map, tap } from 'rxjs/operators';
import { HOST } from "./host-name";

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private searchutilPre = HOST + 'api/v1.0.0/searchutil';
  private metadataPre = HOST + 'api/v1.0.0/metadata/';
  private latestPricePre = HOST + 'api/v1.0.0/latestprice/';
  private newsPre = HOST + 'api/v1.0.0/news/';
  private dailyChartsPre = HOST + 'api/v1.0.0/dailycharts/';
  private histChartsPre = HOST + 'api/v1.0.0/histcharts/';




  constructor(private http: HttpClient) { }

  fetchSearchutil(ticker: string): Observable<Object> {
    const searchutilUrl = `${this.searchutilPre}/${ticker}`;
    return this.http.get(searchutilUrl).pipe(
      catchError(this.handleError('fetchSearchutil', [])) // then handle the error
    );
  }


  fetchMetadata(ticker: string): Observable<Object> {
    const metaDataUrl = `${this.metadataPre}/${ticker}`;
    return this.http.get(metaDataUrl).pipe(
      catchError(this.handleError('fetchMetadata', [])) // then handle the error
    );
  }

  fetchLatestPrice(ticker: string): Observable<Object> {
    const latestPriceUrl = `${this.latestPricePre}/${ticker}`;
    return this.http.get(latestPriceUrl).pipe(
      catchError(this.handleError('fetchLatestPrice', [])) // then handle the error
    );
  }

  fetchNews(ticker: string): Observable<Object> {
    const newsUrl = `${this.newsPre}/${ticker}`;
    return this.http.get(newsUrl).pipe(
      catchError(this.handleError('fetchNews', [])) // then handle the error
    );
  }

  fetchDailyCharts(ticker: string, startDate: string): Observable<Object> {
    const dailyChartsUrl = `${this.dailyChartsPre}/${ticker}/date/${startDate}`;
    return this.http.get(dailyChartsUrl).pipe(
      catchError(this.handleError('fetchDailyCharts', [])) // then handle the error
    );
  }

  fetchHistCharts(ticker: string, startDate: string): Observable<Object> {
    const histChartsUrl = `${this.histChartsPre}/${ticker}/date/${startDate}`;
    return this.http.get(histChartsUrl).pipe(
      catchError(this.handleError('fetchHistCharts', [])) // then handle the error
    );
  }







  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}

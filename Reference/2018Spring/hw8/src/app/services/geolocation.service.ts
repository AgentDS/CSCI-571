import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable()
export class GeolocationService {

  constructor(
    private http: HttpClient
  ) { }

  private url:string = 'http://ip-api.com/json';

  getGeolocation() {
    return this.http.get(this.url);
  }


}

import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-input-user-data-form',
  templateUrl: './input-user-data-form.component.html',
  styleUrls: ['./input-user-data-form.component.css']
})
export class InputUserDataFormComponent implements OnInit {

  constructor(public http: HttpClient) { }

  ngOnInit(): void {
  }

  submit() {
    const api = 'https://zhiyuhomework8.wl.r.appspot.com/?' +
                'keywords=sss' +
                '&paginationInput.entriesPerPage=100' +
                '&itemFilter(0).name=MaxPrice' +
                '&itemFilter(0).value=1000&itemFilter(0).paramName=Currency' +
                '&itemFilter(0).paramValue=USD' +
                '&itemFilter(1).name=MinPrice' +
                '&itemFilter(1).value=10' +
                '&itemFilter(1).paramName=Currency' +
                '&itemFilter(1).paramValue=USD';
    this.http.get(api).subscribe(response =>
    {
      console.log(response);
    });
  }

}

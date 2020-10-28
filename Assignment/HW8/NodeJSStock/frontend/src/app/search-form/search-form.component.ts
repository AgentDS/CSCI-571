import { Component, OnInit } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {
  searchForm;
  ticker;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
    ) {
    this.searchForm = this.formBuilder.group({ ticker: '' })
  }

  ngOnInit() {
    console.log("search-form");
  }



  onSubmit(tickerData) {
    console.warn('ticker name in form: ', tickerData.ticker);
    this.ticker = tickerData.ticker;
    this.router.navigateByUrl('/details/' + this.ticker);
    this.searchForm.reset();
  }
}

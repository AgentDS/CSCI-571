import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { switchMap, debounceTime, tap, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BackendService } from '../backend.service';
import { SearchUtility } from '../search-utility';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css'],
})
export class SearchFormComponent implements OnInit {
  filteredCompanies: SearchUtility[] = [];
  searchForm: FormGroup;
  isLoading = false;
  ticker: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private backService: BackendService
  ) {
  }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({ tickerInput: '' });
    // console.log("search-form");
    this.searchForm
      .get('tickerInput')
      .valueChanges.pipe(
        debounceTime(300),
        tap(() => (this.isLoading = true)),
        switchMap((value) =>
          this.backService
            .fetchSearchutil(value)
            .pipe(finalize(() => (this.isLoading = false)))
        )
      )
      .subscribe((companies) => (this.filteredCompanies = companies));
  }

  onSubmit(tickerData) {
    console.log('ticker name in form: ', tickerData.tickerInput.ticker);
    this.ticker = tickerData.tickerInput.ticker;
    this.router.navigateByUrl('/details/' + this.ticker);
    this.searchForm.reset();
  }

  displayFn(company: SearchUtility) {
    if (company) { return company.ticker; }
  }
}

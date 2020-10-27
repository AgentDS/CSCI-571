import { Component, OnInit } from '@angular/core';
import { FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {
  searchForm;
  
  constructor(private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({ ticker: '' })
  }

  ngOnInit() {
  }

  onSubmit(tickerData) {
    this.searchForm.reset();
    console.warn('ticker name: ', tickerData);
  }
}

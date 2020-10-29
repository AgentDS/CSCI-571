import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BackendService } from "../backend.service";

import { Metadata } from "../metadata";
import { Latestprice } from "../latestprice";


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  ticker: string = '';
  metadata;


  constructor(private route: ActivatedRoute,
              private backendService: BackendService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.ticker = params.get('ticker');
      console.log("ticker name in details: " + this.ticker);
    });

    this.backendService.fetchMetadata(this.ticker).subscribe(metadata => {
      this.metadata = metadata;
      console.log(this.metadata);
    });
    // console.log(this.metadata);







  }

}

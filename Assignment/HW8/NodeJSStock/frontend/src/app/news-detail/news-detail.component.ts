import { Component, OnInit, Input } from '@angular/core';
import { News } from '../news';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent implements OnInit {
  @Input() public news: News;

  constructor() { }

  ngOnInit() {
    console.log(this.news);
  }

}


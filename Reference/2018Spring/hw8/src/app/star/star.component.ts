import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnInit {
  private _rating = 0;
  @Input() set rating(rating: number) {
    this._rating = Math.round((rating/5.0)*100);
  }

  get rating(): number {return this._rating;}

  constructor() { }

  ngOnInit() {
  }

}

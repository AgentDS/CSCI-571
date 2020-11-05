import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-transaction-button',
  templateUrl: './transaction-button.component.html',
  styleUrls: ['./transaction-button.component.css']
})
export class TransactionButtonComponent implements OnInit {
  @Input() public ticker: string;
  @Input() public currentPrice: number;
  @Input() public opt: string; // 'Buy' or 'Sell'
  quantity: number = 0;


  constructor(public transModalService: NgbActiveModal) { }

  ngOnInit() {
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-transaction-button',
  templateUrl: './transaction-button.component.html',
  styleUrls: ['./transaction-button.component.css'],
})
export class TransactionButtonComponent implements OnInit {
  @Input() public ticker: string;
  @Input() public currentPrice: number;
  @Input() public opt: string; // 'Buy' or 'Sell'
  inputQuantity: number = 0;
  purchasedQuantity: number = 0;
  tickerInfor;

  getTickerStorage(ticker, opt) {
    let portfolioArr = localStorage.getItem('Portfolio')
      ? JSON.parse(localStorage.getItem('Portfolio'))
      : [];
    if (opt == 'Sell') {
      this.tickerInfor = portfolioArr.filter(
        (data) => data.ticker == ticker
      )[0];
      this.purchasedQuantity = this.tickerInfor.quantity;
    }
  }

  public executeOpt(inputQuantity, opt) {}

  constructor(public transModalService: NgbActiveModal) {}

  ngOnInit() {
    this.getTickerStorage(this.ticker, this.opt);
  }
}

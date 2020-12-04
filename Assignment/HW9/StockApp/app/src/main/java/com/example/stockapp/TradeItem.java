package com.example.stockapp;

import java.io.Serializable;

public class TradeItem implements Serializable {

    private double balance;
    private String tickerName;
    private String companyName;
    private double currentPrice;
//    private int shareNum;  // number of shares if in portfolio

    public TradeItem(double balance,
                     String tickerName,
                     String companyName,
                     double currentPrice) {
        this.currentPrice = currentPrice;
        this.companyName = companyName;
        this.tickerName = tickerName;
        this.balance = balance;
    }

    public String getTickerName() {
        return tickerName;
    }

    public String getCompanyName() {
        return companyName;
    }

    public double getBalance() {
        return balance;
    }

    public double getCurrentPrice() {
        return currentPrice;
    }
}

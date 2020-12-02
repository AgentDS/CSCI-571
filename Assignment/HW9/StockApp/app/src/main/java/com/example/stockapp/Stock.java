package com.example.stockapp;

public class Stock {
    private String tickerName;
    private String companyName;
    private double priceChange;
    private double currentPrice;
    private int shareNum;  // number of shares if in portfolio

    public Stock(String tickerName,
                 String companyName,
                 double priceChange,
                 double currentPrice,
                 int shareNum) {
        this.tickerName = tickerName;
        this.companyName = companyName;
        this.priceChange = priceChange;
        this.currentPrice = currentPrice;
        this.shareNum = shareNum;
    }

    public String getTickerName() {
        return tickerName;
    }

    public String getCompanyName() {
        return companyName;
    }

    public double getCurrentPrice() {
        return currentPrice;
    }

    public int getShareNum() {
        return shareNum;
    }

    public double getPriceChange() {
        return priceChange;
    }


}

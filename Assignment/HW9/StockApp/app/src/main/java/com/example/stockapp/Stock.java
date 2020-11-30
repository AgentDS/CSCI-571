package com.example.stockapp;

public class Stock {
    private String tickerName;
    private String companyName;
    private float priceChange;
    private float currentPrice;
    private int shareNum;  // number of shares if in portfolio

    public Stock(String tickerName,
                 String companyName,
                 float priceChange,
                 float currentPrice,
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

    public float getCurrentPrice() {
        return currentPrice;
    }

    public int getShareNum() {
        return shareNum;
    }

    public float getPriceChange() {
        return priceChange;
    }


}

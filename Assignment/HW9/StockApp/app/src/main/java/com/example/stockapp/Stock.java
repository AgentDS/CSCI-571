package com.example.stockapp;

public class Stock {
    private String tickerName;
    private String companyName;
    private float priceChange;
    private float currentPrice;
    private int trendingImageId;
    private boolean inPortfolio = false;
    private float shareNum = 0;  // number of shares if in portfolio

    public Stock(String tickerName,
                 String companyName,
                 float priceChange,
                 float currentPrice,
                 int trendingImageId) {
        this.tickerName = tickerName;
        this.companyName = companyName;
        this.priceChange = priceChange;
        this.currentPrice = currentPrice;
        this.trendingImageId = trendingImageId;
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

    public float getShareNum() {
        return shareNum;
    }

    public float getPriceChange() {
        return priceChange;
    }

    public int getTrendingImageId() {
        return trendingImageId;
    }

    public boolean isInPortfolio() {
        return inPortfolio;
    }
}

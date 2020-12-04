package com.example.stockapp;

import java.io.Serializable;

public class LocalStock implements Serializable {
    private String tickerName;
    private String companyName;
    private int shareNum;  // number of shares if in portfolio

    public LocalStock(String tickerName,
                      String companyName,
                      int shareNum) {
        this.tickerName = tickerName;
        this.companyName = companyName;
        this.shareNum = shareNum;
    }

    public int getShareNum() {
        return shareNum;
    }

    public String getCompanyName() {
        return companyName;
    }

    public String getTickerName() {
        return tickerName;
    }
}

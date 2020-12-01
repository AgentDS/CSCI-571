package com.example.stockapp;

public class StatesAreaPriceStr {
    private String priceStr;  // string for number: format("%.2f", num)
    private String priceType;

    public StatesAreaPriceStr(String numStr, String priceType) {
        this.priceType = priceType;
        if (priceType == "current") {
            priceStr = "Current Price:\n" + numStr;
        } else if (priceType == "low") {
            priceStr = "Low:\n" + numStr;
        } else if (priceType == "bid") {
            priceStr = "Bid Price:\n" + numStr;
        } else if (priceType == "open") {
            priceStr = "Open Price:\n" + numStr;
        } else if (priceType == "mid") {
            priceStr = "Mid:\n" + numStr;
        } else if (priceType == "high") {
            priceStr = "High:\n" + numStr;
        } else if (priceType == "volume") {
            priceStr = "Volume:\n" + numStr;
        }
    }

    public String getPriceStr() {
        return priceStr;
    }

    public String getPriceType() {
        return priceType;
    }
}

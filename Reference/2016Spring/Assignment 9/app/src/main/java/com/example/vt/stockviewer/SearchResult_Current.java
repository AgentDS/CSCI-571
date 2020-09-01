package com.example.vt.stockviewer;

import android.graphics.drawable.Drawable;
import android.widget.ImageView;

/**
 * Created by vt on 5/2/16.
 */
public class SearchResult_Current {
    private String companyName = "";
    private String Name = "";
    private String LastPrice = "";
    private String ChangePercent = "";
    private String Timestamp = "";
    private String MSDate = "";
    private String MarketCap = "";
    private String Volume = "";
    private String ChangeYTD = "";
    private String ChangePercentYTD = "";
    private String High = "";
    private String Low = "";
    private String Open = "";
    private String Change = "";
    private String headerInfo ="";
    private String data;

    public void setData(String data) {
        this.data = data;
    }

    public String getData() {

        return data;
    }

    public void setHeaderInfo(String headerInfo) {
        this.headerInfo = headerInfo;
    }

    public String getHeaderInfo() {

        return headerInfo;
    }


    public void setFlag(Drawable flag) {
        this.flag = flag;
    }

    public Drawable getFlag() {

        return flag;
    }

    private Drawable flag;

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public void setName(String name) {
        Name = name;
    }

    public void setLastPrice(String lastPrice) {
        LastPrice = lastPrice;
    }

    public void setChangePercent(String changePercent) {
        ChangePercent = changePercent;
    }

    public void setTimestamp(String timestamp) {
        Timestamp = timestamp;
    }

    public void setMSDate(String MSDate) {
        this.MSDate = MSDate;
    }

    public void setMarketCap(String marketCap) {
        MarketCap = marketCap;
    }

    public void setVolume(String volume) {
        Volume = volume;
    }

    public void setChangeYTD(String changeYTD) {
        ChangeYTD = changeYTD;
    }

    public void setChangePercentYTD(String changePercentYTD) {
        ChangePercentYTD = changePercentYTD;
    }

    public void setHigh(String high) {
        High = high;
    }

    public void setLow(String low) {
        Low = low;
    }

    public void setOpen(String open) {
        Open = open;
    }

    public void setChange(String change) {
        Change = change;
    }

    public String getCompanyName() {
            return companyName;
        }

        public String getName() {
            return Name;
        }

        public String getLastPrice() {
            return LastPrice;
        }

        public String getChangePercent() {
            return ChangePercent;
        }

        public String getTimestamp() {
            return Timestamp;
        }

        public String getMSDate() {
            return MSDate;
        }

        public String getMarketCap() {
            return MarketCap;
        }

        public String getVolume() {
            return Volume;
        }

        public String getChangeYTD() {
            return ChangeYTD;
        }

        public String getChangePercentYTD() {
            return ChangePercentYTD;
        }

        public String getHigh() {
            return High;
        }

        public String getLow() {
            return Low;
        }

        public String getOpen() {
            return Open;
        }

        public String getChange() {
            return Change;
        }



}

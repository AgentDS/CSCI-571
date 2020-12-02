package com.example.stockapp;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class BackendUrlMaker {

    private String HOST = "https://csci571-hw8backend.wl.r.appspot.com/";
    private String searchutilPre = HOST + "api/v1.0.0/searchutil/";
    private String metadataPre = HOST + "api/v1.0.0/metadata/";
    private String latestPricePre = HOST + "api/v1.0.0/latestprice/";
    private String newsPre = HOST + "api/v1.0.0/news/";
    private String histChartsPre = HOST + "api/v1.0.0/histcharts/";

    private String searchutilUrl;
    private String metadataUrl;
    private String latestPriceUrl;
    private String newsUrl;
    private String histChartsUrl;


    public BackendUrlMaker(String ticker) {
        String startDate = getStartDate();
        searchutilUrl = searchutilPre + ticker;
        metadataUrl = metadataPre + ticker;
        latestPriceUrl = latestPricePre + ticker;
        newsUrl = newsPre + ticker;
        histChartsUrl = histChartsPre + ticker + "/date/" + startDate;
    }

    public String getSearchutilUrl() {
        return searchutilUrl;
    }

    public String getMetadataUrl() {
        return metadataUrl;
    }

    public String getLatestPriceUrl() {
        return latestPriceUrl;
    }

    public String getNewsUrl() {
        return newsUrl;
    }

    public String getHistChartsUrl() {
        return histChartsUrl;
    }

    private String getStartDate() {
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.YEAR, -2); // to get previous year add -1
        Date twoYearsAgo = cal.getTime();
        SimpleDateFormat simpleDate = new SimpleDateFormat("yyyy-MM-dd");
        String twoYearsAgoStr = simpleDate.format(twoYearsAgo);
        return twoYearsAgoStr;
    }
}

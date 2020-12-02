package com.example.stockapp;

import android.util.Log;

import java.text.ParseException;
import java.text.SimpleDateFormat;

import java.util.Date;
import java.util.TimeZone;

public class News {
    private String urlToImage;
    private String sourceName;
    private String title;
    private String publishedAt;  // strings like "2020-11-04T14:01:01Z"
    private String url;  // for sharing
    private String timeAgo;

    public News(String urlToImage,
                String sourceName,
                String title,
                String publishedAt,
                String url) {
        this.urlToImage = urlToImage;
        this.sourceName = sourceName;
        this.title = title;
        this.publishedAt = publishedAt;
        this.url = url;
    }

    private void setTimeAgo() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");
        try {
            Date publishedDate = sdf.parse(publishedAt);
            Date today = new Date();
            long diff = today.getTime() - publishedDate.getTime();
            int min = (int) (diff / (1000 * 60));
            int hour = (int) (diff / (1000 * 3600));
            int day = (int) (diff / (1000 * 3600 * 24));
            if (day < 1) {
                if (hour > 1) {
                    timeAgo = String.format("%d hours ago", hour);
                } else if (hour == 1) {
                    timeAgo = "1 hour ago";
                } else {
                    if (min > 1) {
                        timeAgo = String.format("%d mins ago", min);
                    } else {
                        timeAgo = "1 min ago";
                    }
                }
            } else if (day == 1) {
                timeAgo = "1 day ago";
            } else {
                timeAgo = String.format("%d days ago", day);
            }
        } catch (ParseException e) {
            e.printStackTrace();
        }
    }


}

package com.example.vt.stockviewer;

/**
 * Created by vt on 5/2/16.
 */
public class SearchResults {
    private String title = "";
    private String Description = "";
    private String Publisher = "";
    private String Date ="";

    public String getUrl() {
        return Url;
    }

    public void setUrl(String url) {
        Url = url;
    }

    private String Url ="";

    public void setTitle(String title) {
        this.title = title;
    }

    public String getTitle() {
        return title;
    }

    public void setDescription(String Description) {
        this.Description = Description;
    }

    public String getDescription() {
        return Description;
    }
    public void setPublisher(String Publisher) {
        this.Publisher = Publisher;
    }

    public String getPublisher() {
        return Publisher;
    }
    public void setDate(String da) {
        this.Date = da;
    }

    public String getDate() {
        return Date;
    }
}
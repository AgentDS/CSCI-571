package com.zhiyu.ebaysearch;

import org.json.JSONArray;
import org.json.JSONObject;

public class Products {
    private String imageUrl;
    private String title;
    private String itemUrl;
    private String shipping;
    private String topFlag;
    private String condition;
    private String price;
    private String itemID;
    private JSONObject shippingInfo;



    public Products() {
    }



    public Products(String imageUrl, String title, String itemUrl, String shipping, String topFlag, String condition, String price, String itemID, JSONObject shippingInfo) {
        this.imageUrl = imageUrl;
        this.title = title;
        this.itemUrl = itemUrl;
        this.shipping = shipping;
        this.topFlag = topFlag;
        this.condition = condition;
        this.price = price;
        this.itemID = itemID;
        this.shippingInfo = shippingInfo;
    }



    public JSONObject getShippingInfo() {
        return shippingInfo;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public String getTitle() {
        return title;
    }

    public String getItemUrl() {
        return itemUrl;
    }

    public String getShipping() {
        return shipping;
    }

    public String getTopFlag() {
        return topFlag;
    }

    public String getCondition() {
        return condition;
    }

    public String getPrice() {
        return price;
    }

    public String getItemID() {
        return itemID;
    }



    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setItemUrl(String itemUrl) {
        this.itemUrl = itemUrl;
    }

    public void setShipping(String shipping) {
        this.shipping = shipping;
    }

    public void setTopFlag(String topFlag) {
        this.topFlag = topFlag;
    }

    public void setCondition(String condition) {
        this.condition = condition;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public void setItemID(String itemID) {
        this.itemID = itemID;
    }

    public void setShippingInfo(JSONObject shippingInfo) {
        this.shippingInfo = shippingInfo;
    }

}




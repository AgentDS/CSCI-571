package com.zhiyu.ebaysearch;

public class ProductDetails {
    private String imgUrls;
    private String title;
    private String price;
    private String shipping;
    private String subTitle;
    private String brand;
    private String specification;
    private String sellerInfo;
    private String returnPolicies;
    private String shippingInfo;

    public ProductDetails() {
    }

    public ProductDetails(String imgUrls, String title, String price, String shipping, String subTitle, String brand, String specification, String sellerInfo, String returnPolicies, String shippingInfo) {
        this.imgUrls = imgUrls;
        this.title = title;
        this.price = price;
        this.shipping = shipping;
        this.subTitle = subTitle;
        this.brand = brand;
        this.specification = specification;
        this.sellerInfo = sellerInfo;
        this.returnPolicies = returnPolicies;
        this.shippingInfo = shippingInfo;
    }

    public String getImgUrls() {
        return imgUrls;
    }

    public String getTitle() {
        return title;
    }

    public String getPrice() {
        return price;
    }

    public String getShipping() {
        return shipping;
    }

    public String getSubTitle() {
        return subTitle;
    }

    public String getBrand() {
        return brand;
    }

    public String getSpecification() {
        return specification;
    }

    public String getSellerInfo() {
        return sellerInfo;
    }

    public String getReturnPolicies() {
        return returnPolicies;
    }

    public String getShippingInfo() {
        return shippingInfo;
    }


    public void setImgUrls(String imgUrls) {
        this.imgUrls = imgUrls;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public void setShipping(String shipping) {
        this.shipping = shipping;
    }

    public void setSubTitle(String subTitle) {
        this.subTitle = subTitle;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public void setSpecification(String specification) {
        this.specification = specification;
    }

    public void setSellerInfo(String sellerInfo) {
        this.sellerInfo = sellerInfo;
    }

    public void setReturnPolicies(String returnPolicies) {
        this.returnPolicies = returnPolicies;
    }

    public void setShippingInfo(String shippingInfo) {
        this.shippingInfo = shippingInfo;
    }
}


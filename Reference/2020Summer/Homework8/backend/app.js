
var express = require("express");
var app = express();

var request = require("request");
//
// const cors = require('cors');
// app.use(cors());


var url = "https://svcs.ebay.com/services/search/FindingService/v1?" +
          "OPERATION-NAME=findItemsAdvanced&SERVICE-VERSION=1.0.0" +
          "&SECURITY-APPNAME=zhiyuhar-homework-PRD-12eb6beb6-eb0c3bf5" +
          "&RESPONSE-DATA-FORMAT=JSON" +
          "&REST-PAYLOAD"+
          "&paginationInput.entriesPerPage=100";
          // "&keywords=iphone&itemFilter(0).name=MaxPrice&itemFilter(0).value=1000&itemFilter(0).paramName=Currency&itemFilter(0).paramValue=USD&itemFilter(1).name=MinPrice&itemFilter(1).value=10&itemFilter(1).paramName=Currency&itemFilter(1).paramValue=USD"


// app.all('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//     res.header("X-Powered-By",' 3.2.1')
//     res.header("Content-Type", "application/json;charset=utf-8");
//     next();
// });


// root of the website to deal with client get request and get data from API
app.get('/', function(req, res){
    // req.query中存放get请求的参数
    // console.log(req.query)
    for (var key in req.query) {
      url += "&" + key + "=" + req.query[key];
    }
    // console.log(url);
    request(url, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          // console.log(body);
          // console.log(typeof body);
          // res.send(JSON.stringify(body));

          // JSON.stringify用于将对象转成JSON文本，JSON.parse用于将JSON文本转成对象
          var searchData = JSON.parse(body);
          var result = filterData(searchData);
          // console.log(jsonResult["findItemsAdvancedResponse"][0]);
          console.log(typeof (result));
          console.log(result["totalEntries"]);
          // res.json(JSON.stringify(result).toString());
          // res.send(JSON.stringify(result));
          res.header("Access-Control-Allow-Origin","*");
          res.json(result);

        }
      });


});


app.listen(8080, function(){
    console.log("The server have started at 8080!");
});


function filterData(jsonData) {
    var data = jsonData["findItemsAdvancedResponse"][0];
    var dataDic ={};
    var count = 0;
    dataDic["totalEntries"] = data["paginationOutput"][0]["totalEntries"];
    
    if (parseInt(data["paginationOutput"][0]["totalEntries"][0]) === 0) {
        dataDic["count"] = 0;
        return dataDic;
    }
    
    var itemsList = data["searchResult"][0]["item"];
    var filterResultList =[];
    for (var i = 0; i < itemsList.length; i++) {
        var oneItem = itemsList[i];
        if (!missingField(oneItem)) {
            filterResultList.push(oneItem);
            count++;
        }
        
    }
    
    dataDic["searchResult"] = filterResultList;
    dataDic["count"] = count;
    return dataDic;
    
}


function missingField(itemDic) {
    if (itemDic["title"] == null ) {
        return true;
    }
    
    if (itemDic["galleryURL"] == null ) {
        itemDic["galleryURL"] =[];
        itemDic["galleryURL"][0] = "../../assets/image/ebayDefault.png";
    }
    
    if (itemDic["galleryURL"][0] === "https://thumbs1.ebaystatic.com/pict/04040_0.jpg") {
        itemDic["galleryURL"][0] = "../../assets/image/ebayDefault.png";
    }
    
    if (itemDic["sellingStatus"] == null ) {
        return true;
    }
    
    if (itemDic["sellingStatus"][0]["currentPrice"] == null ) {
        return true;
    }
    
    if (itemDic["location"] == null ) {
        return true;
    }
    
    if (itemDic["primaryCategory"] == null ) {
        return true;
    }
    
    if (itemDic["primaryCategory"][0]["categoryName"] == null ) {
        return true;
    }
    
    if (itemDic["condition"]== null ) {
        return true;
    }
    
    if (itemDic["condition"][0]["conditionDisplayName"] == null ) {
        return true;
    }
    
    
    if (itemDic["shippingInfo"] == null ) {
        return true;
    }
    
    if (itemDic["shippingInfo"][0]["shippingType"] == null ) {
        return true;
    }
    
    if (itemDic["shippingInfo"][0]["shippingServiceCost"] == null ) {
        return true;
    }
    
    if (itemDic["shippingInfo"][0]["shipToLocations"] == null ) {
        return true;
    }
    
    if (itemDic["shippingInfo"][0]["expeditedShipping"] == null ) {
        return true;
    }
    
    // if (itemDic["shippingInfo"][0]["expeditedShipping"][0] === "false") {
    //     itemDic["shippingInfo"][0]["expeditedShipping"][0] = "&#x274C;";
    // }
    //
    // if (itemDic["shippingInfo"][0]["expeditedShipping"][0] === "true") {
    //     itemDic["shippingInfo"][0]["expeditedShipping"][0] = "../../assets/image/";
    // }
    //
    if (itemDic["shippingInfo"][0]["oneDayShippingAvailable"] == null ) {
        return true;
    }
    
    if (itemDic["listingInfo"] == null ) {
        return true;
    }
    
    if (itemDic["listingInfo"][0]["bestOfferEnabled"] == null ) {
        return true;
    }
    
    if (itemDic["listingInfo"][0]["buyItNowAvailable"] == null ) {
        return true;
    }
    
    if (itemDic["listingInfo"][0]["listingType"] == null ) {
        return true;
    }
    
    if (itemDic["listingInfo"][0]["gift"] == null ) {
        return true;
    }
    
    if (itemDic["listingInfo"][0]["watchCount"]== null ) {
        return true;
    }
    
    return false;
    
}

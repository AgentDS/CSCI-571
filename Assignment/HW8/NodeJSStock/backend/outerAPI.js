const fetch = require('node-fetch');
const async = require('express-async-await');
const NewsAPI = require('newsapi');
const url = require('url');
const https = require('https');
const HttpsProxyAgent = require('https-proxy-agent');  // proxy is needed when local developing using VPN to access news API
// export http_proxy=http://127.0.0.1:1087;export https_proxy=http://127.0.0.1:1087;

const tiingoAPIkey = "be37d86b75ad931e483aaab61f620653921a7517";
const newsAPIkey = '166945ff132b43c2a1a395898628ab48';
// const newsAPIkey = '83d88b3f4f9d44ccad89772a6ef0e218';  // candidate key

// const newsapi = new NewsAPI(newsAPIkey, {corsProxyUrl: 'https://cors-anywhere.herokuapp.com/'});

module.exports.getAutocomplete = getAutocomplete;
module.exports.getCompanyMetaData = getCompanyMetaData;
module.exports.getLatestPrice = getLatestPrice;
module.exports.getNews = getNews;


async function getAutocomplete(keyword) {
    let url = `https://api.tiingo.com/tiingo/utilities/search?query=${keyword}&token=${tiingoAPIkey}`;
    let headers = {'Content-Type': 'application/json'};
    let APIres = await fetch(url, {method: 'GET', headers: headers});
    let searchRes = await APIres.json();
    return searchRes;
}


async function getCompanyMetaData(tickerName) {
    // table 4.1 content: Company’s Meta Data API call
    let url = `https://api.tiingo.com/tiingo/daily/${tickerName}?token=${tiingoAPIkey}`;
    let headers = {'Content-Type': 'application/json'};
    let APIres = await fetch(url, {method: 'GET', headers: headers});
    let metaDataRes = await APIres.json();
    return metaDataRes;
}

async function getLatestPrice(tickerName) {
    // table 4.2 content: Company’s Latest Price of the Stock
    let url = `https://api.tiingo.com/iex/?tickers=${tickerName}&token=${tiingoAPIkey}`;
    let headers = {'Content-Type': 'application/json'};
    let APIres = await fetch(url, {method: 'GET', headers: headers});
    let latestPriceRes = await APIres.json();
    return latestPriceRes;
}


async function getNews(keyword) {
    let url = `https://newsapi.org/v2/everything?q=${keyword}&apiKey=${newsAPIkey}&pageSize=20&page=1`;
    let headers = {'Content-Type': 'application/json'};
    let APIres = await fetch(url, {
        method: 'GET',
        headers: headers,
        agent: new HttpsProxyAgent('http://127.0.0.1:1087')
    }).catch(error => {
        console.log("News fetch failed.");
    });
    if (APIres == null) {
        var newsRes = null;
    } else {
        var origRes = await APIres.json();
        var newsRes = await origRes.articles;
        // console.log(newsRes[0]);
        // console.log(typeof newsRes[0]);
    }

    return newsRes;
}





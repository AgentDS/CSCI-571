const fetch = require('node-fetch');
const async = require('express-async-await');
const url = require('url');
const https = require('https');
const HttpsProxyAgent = require('https-proxy-agent');  // proxy is needed when local developing using VPN to access news API
// export http_proxy=http://127.0.0.1:1087;export https_proxy=http://127.0.0.1:1087;

// const tiingoAPIkey = 'be37d86b75ad931e483aaab61f620653921a7517';
const tiingoAPIkey = '1b6079fdbcdf885ca86b55ac78424ae496523b34';
// const tiingoAPIkey = 'dea471cb1109196d1921d429284606624f433067';
const newsAPIkey = '166945ff132b43c2a1a395898628ab48';
// const newsAPIkey = '83d88b3f4f9d44ccad89772a6ef0e218';  // candidate key


module.exports.getAutocomplete = getAutocomplete;
module.exports.getCompanyMetaData = getCompanyMetaData;
module.exports.getLatestPrice = getLatestPrice;
module.exports.getNews = getNews;
module.exports.getDailyChartData = getDailyChartData;
module.exports.getHistChartsData = getHistChartsData;


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
    if (latestPriceRes.length === 0) {
        return {"detail": "Not found."};
    } else {
        return latestPriceRes[0];
    }

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
    let newsRes;
    if (APIres == null) {
        newsRes = null;
    } else {
        let origRes = await APIres.json();
        let totalResults = await origRes.totalResults;
        if (totalResults == 0) {
            newsRes = [];
        } else {
            newsRes = await origRes.articles;
        }
    }
    return newsRes;
}

async function getDailyChartData(startDate, tickerName) {
    // Company’s Last day’s chart data (close price)
    let url = `https://api.tiingo.com/iex/${tickerName}/prices?startDate=${startDate}&resampleFreq=4min&columns=close&token=${tiingoAPIkey}`;
    let headers = {'Content-Type': 'application/json'};
    let APIres = await fetch(url, {method: 'GET', headers: headers});
    let dailyPriceRes = await APIres.json();
    return dailyPriceRes;
}

async function getHistChartsData(startDate, tickerName) {
    // Company’s Historical data in the last 2 years
    let url = `https://api.tiingo.com/tiingo/daily/${tickerName}/prices?startDate=${startDate}&resampleFreq=daily&token=${tiingoAPIkey}`;
    let headers = {'Content-Type': 'application/json'};
    let APIres = await fetch(url, {method: 'GET', headers: headers});
    let histRes = await APIres.json();
    return histRes;
}


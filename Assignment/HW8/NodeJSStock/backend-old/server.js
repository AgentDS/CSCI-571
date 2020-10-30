const express = require('express');
const outerAPI = require('./outerAPI');
const cors = require('cors');
const app = express();
const port = 3000;

function ignoreFavicon(req, res, next) {
    if (req.originalUrl.includes('favicon.ico')) {
        res.status(204).end()
    }
    next();
}

function checkArray(priceRes) {
    if (Array.isArray(priceRes)) {
        console.log('Record length: ' + priceRes.length);
    } else {
        console.log("Ticker Not Found");
    }
}

app.use(ignoreFavicon);
app.use(cors());

app.get('/', (req, res) => {
    return res.send('Stock Search by Siqi Liang');
})


app.get('/api/v1.0.0/searchutil/:keyword', async function (req, res) {
    console.log("\nSearch-utilities Call");
    console.log("Keyword: " + req.params.keyword);
    // if not found, response is [] with length 0
    let origRes = await outerAPI.getAutocomplete(req.params.keyword);
    console.log("Length of response: " + origRes.length + "\n");
    console.log("Search-utilities finished at " + Date());
    return res.send(origRes);
    // if (origRes)
    //     return res.status(200).json(origRes);
})

app.get('/api/v1.0.0/metadata/:tickerName', async function (req, res) {
    console.log("\nCompany Meta Data Call");
    console.log("Ticker: " + req.params.tickerName.toUpperCase());
    // if not found, response is {"detail":"Not found."}
    let origRes = await outerAPI.getCompanyMetaData(req.params.tickerName);
    console.log("Company Meta Data finished at " + Date());
    return res.send(origRes);
    // if (origRes)
    //     return res.status(200).json(origRes);
})


app.get('/api/v1.0.0/latestprice/:tickerName', async function (req, res) {
    console.log("\nCompany Latest Price Call");
    console.log("Ticker: " + req.params.tickerName.toUpperCase());
    // if not found, response is [] with length 0
    let origRes = await outerAPI.getLatestPrice(req.params.tickerName);
    console.log("Company Latest Price finished at " + Date());
    return res.send(origRes);
    // if (origRes)
    //     return res.status(200).json(origRes);
})


app.get('/api/v1.0.0/news/:keyword', async function (req, res) {
    console.log("\nNews Call");
    console.log("Keyword: " + req.params.keyword);
    // if error in fetch, response is null

    let origRes = await outerAPI.getNews(req.params.keyword);

    if (origRes) {
        console.log("Length of response: " + origRes.length);
        console.log("sample news title length:" + origRes[0].title.length);
    } else {
        console.log("Null news.");
    }
    console.log("News finished at " + Date());
    return res.send(origRes);
    // if (origRes)
    //     return res.status(200).json(origRes);
})

app.get('/api/v1.0.0/dailycharts/:tickerName/date/:startDate', async function (req, res) {
    console.log("\nCompany Last day’s chart data Call");
    console.log("Ticker: " + req.params.tickerName.toUpperCase());
    console.log("Start Date: " + req.params.startDate);
    // if not found, response is {"detail":"Not found."}
    let origRes = await outerAPI.getDailyChartData(req.params.startDate, req.params.tickerName);
    checkArray(origRes);
    console.log("Company Last day’s chart data finished at " + Date());
    return res.send(origRes);
    // if (origRes)
    //     return res.status(200).json(origRes);
})

app.get('/api/v1.0.0/histcharts/:tickerName/date/:startDate', async function (req, res) {
    console.log("\nCompany Historical chart data Call");
    console.log("Ticker: " + req.params.tickerName.toUpperCase());
    console.log("Start Date: " + req.params.startDate);
    // if not found, response is object {"detail":"Error: Ticker 'xxxx' not found"}
    // otherwise response is array of object
    let origRes = await outerAPI.getHistChartsData(req.params.startDate, req.params.tickerName);
    checkArray(origRes);
    console.log("Company Historical chart data finished at " + Date());
    return res.send(origRes);
    // if (origRes)
    //     return res.status(200).json(origRes);
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}\n`);
})




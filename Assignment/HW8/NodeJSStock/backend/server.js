const express = require('express');
const outerAPI = require('./outerAPI');
const app = express();
const port = 3000;

function ignoreFavicon(req, res, next) {
    if (req.originalUrl.includes('favicon.ico')) {
        res.status(204).end()
    }
    next();
}

app.use(ignoreFavicon);

app.get('/', (req, res) => {
    res.send('Stock Search by Siqi Liang');
})


app.get('/api/v1.0.0/searchutil/:keyword', async function (req, res) {
    console.log("\nSearch-utilities Call");
    console.log("Keyword: " + req.params.keyword);
    // if not found, response is [] with length 0
    let origRes = await outerAPI.getAutocomplete(req.params.keyword);
    // let res_info = await JSON.stringify(origRes);
    console.log("Length of response: " + origRes.length + "\n");
    res.send(origRes);
})

app.get('/api/v1.0.0/metadata/:tickerName', async function (req, res) {
    console.log("\nCompany Meta Data Call");
    console.log("Ticker: " + req.params.tickerName);
    // if not found, response is {"detail":"Not found."}
    let origRes = await outerAPI.getCompanyMetaData(req.params.tickerName);
    res.send(origRes);
})


app.get('/api/v1.0.0/latestprice/:tickerName', async function (req, res) {
    console.log("\nCompany Latest Price Call");
    console.log("Ticker: " + req.params.tickerName);
    // if not found, response is [] with length 0
    let origRes = await outerAPI.getLatestPrice(req.params.tickerName);
    res.send(origRes);
})


app.get('/api/v1.0.0/news/:keyword', async function (req, res) {
    console.log("\nNews Call");
    console.log("Keyword: " + req.params.keyword);
    // if error in fetch, response is null
    let origRes = await outerAPI.getNews(req.params.keyword);
    console.log("Length of response: " + origRes.length);
    res.send(origRes);
    if (origRes) {
        console.log("sample news:")
        console.log(origRes[0]);
    } else {
        console.log("Null news.");
    }
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}\n`);
})




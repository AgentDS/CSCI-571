const express = require('express');
const outerAPI = require('./outerAPI');
const cors = require('cors');
const app = express();

function ignoreFavicon(req, res, next) {
    if (req.originalUrl.includes('favicon.ico')) {
        res.status(204).end()
    }
    next();
}

function checkArray(priceRes, tickerName) {
    if (Array.isArray(priceRes)) {
        console.log(`${tickerName} Record length: ${priceRes.length}`);
    } else {
        console.log(`${tickerName} Ticker Not Found`);
    }
}

app.use(ignoreFavicon);
app.use(cors());

app.get('/', (req, res) => {
    return res.send('Stock Search by Siqi Liang');
})


app.get('/api/v1.0.0/searchutil/:keyword', async function (req, res) {
    console.log(`\nSearch-utilities Call: ${req.params.keyword}`);
    // if not found, response is [] with length 0
    let origRes = await outerAPI.getAutocomplete(req.params.keyword);
    let msg = `${req.params.keyword} Search-utilities finished at ${Date()}\nLength of response: ${origRes.length}`;
    console.log(msg);
    return res.send(origRes);
    // if (origRes)
    //     return res.status(200).json(origRes);
})

app.get('/api/v1.0.0/metadata/:tickerName', async function (req, res) {
    console.log(`\nMeta Data Call: ${req.params.tickerName.toUpperCase()}`);
    // if not found, response is {"detail":"Not found."}
    let origRes = await outerAPI.getCompanyMetaData(req.params.tickerName);
    console.log(`${req.params.tickerName.toUpperCase()} Meta Data finished at ${Date()}\n`);
    return res.send(origRes);
    // if (origRes)
    //     return res.status(200).json(origRes);
})


app.get('/api/v1.0.0/latestprice/:tickerName', async function (req, res) {
    console.log(`\nLatest Price Call: ${req.params.tickerName.toUpperCase()}`);
    // if not found, response is {"detail":"Not found."}
    let origRes = await outerAPI.getLatestPrice(req.params.tickerName);
    console.log(`${req.params.tickerName.toUpperCase()} Latest Price finished at ${Date()}\n`);
    return res.send(origRes);
})


app.get('/api/v1.0.0/news/:keyword', async function (req, res) {
    console.log(`\nNews Call: ${req.params.keyword.toUpperCase()}`);
    // if error in fetch, response is null
    let origRes = await outerAPI.getNews(req.params.keyword);
    let msg = req.params.keyword.toUpperCase() + " News finished at " + Date();
    if (origRes && origRes.length) {
        msg += "Length of response: " + origRes.length + "; First title length: " + origRes[0].title.length + "\n";
    } else {
        msg += "Null news.\n";
    }
    console.log(msg);
    return res.send(origRes);
    // if (origRes)
    //     return res.status(200).json(origRes);
})

app.get('/api/v1.0.0/dailycharts/:tickerName/date/:startDate', async function (req, res) {
    console.log(`\nDaily chart data Call: ${req.params.tickerName.toUpperCase()}; Start Date: ${req.params.startDate}`);
    // if not found, response is {"detail":"Not found."}
    let origRes = await outerAPI.getDailyChartData(req.params.startDate, req.params.tickerName);
    checkArray(origRes, req.params.tickerName.toUpperCase());
    console.log(`${req.params.tickerName.toUpperCase()} daily chart data finished at ${Date()}`);
    return res.send(origRes);
    // if (origRes)
    //     return res.status(200).json(origRes);
})

app.get('/api/v1.0.0/histcharts/:tickerName/date/:startDate', async function (req, res) {
    console.log(`\nHistorical chart data Call: ${req.params.tickerName.toUpperCase()}; Start Date: ${req.params.startDate}\n`);
    // if not found, response is object {"detail":"Error: Ticker 'xxxx' not found"}
    // otherwise response is array of object
    let origRes = await outerAPI.getHistChartsData(req.params.startDate, req.params.tickerName);
    checkArray(origRes, req.params.tickerName.toUpperCase());
    console.log(`${req.params.tickerName.toUpperCase()} Historical chart data finished at ${Date()}\n`);
    return res.send(origRes);
    // if (origRes)
    //     return res.status(200).json(origRes);
})


// Listen to the App Engine-specified port, or 3000 otherwise
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`NodeJS Stock Server listening on port ${PORT}...`);
});




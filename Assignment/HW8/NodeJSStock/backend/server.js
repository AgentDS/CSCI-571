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

app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.get('/api/v1.0.0/description/:tickerName', async function (req, res) {
    console.log("Description Call");
    console.log("Ticker: " + req.params.tickerName);
    let origRes = await outerAPI.getCompanyDescription(req.params.tickerName);
    // let res_info = await JSON.stringify(origRes);
    res.send(origRes);
    // console.log(res_info);
    console.log("\n");
})

app.get('/api/v1.0.0/searchutil/:keyword', async function (req, res) {
    console.log("Search-utilities Call");
    console.log("Keyword: " + req.params.keyword);
    let origRes = await outerAPI.getAutoComplete(req.params.keyword);
    // let res_info = await JSON.stringify(origRes);
    console.log("Length of response" + origRes.length);
    res.send(origRes);
    console.log("\n");
})

app.use(ignoreFavicon);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}\n`);
})




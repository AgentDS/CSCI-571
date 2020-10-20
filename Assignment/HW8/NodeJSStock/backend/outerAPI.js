const fetch = require('node-fetch');
const async = require('express-async-await');
const tiingoAPIkey = "be37d86b75ad931e483aaab61f620653921a7517";

module.exports.getCompanyDescription = getCompanyDescription;
module.exports.getAutoComplete = getAutoComplete;

async function getCompanyDescription(tickerName) {
    let url = "https://api.tiingo.com/tiingo/daily/" + tickerName + "?token=" + tiingoAPIkey;
    let headers = {'Content-Type': 'application/json'};

    let APIres = await fetch(url, {method: 'GET', headers: headers});
    let descriptionRes = await APIres.json();
    return descriptionRes;
}

async function getAutoComplete(keyWord) {
    let url = "https://api.tiingo.com/tiingo/utilities/search?query=" + keyWord + "&token=" + tiingoAPIkey;
    let headers = {'Content-Type': 'application/json'};
    let APIres = await fetch(url, {method: 'GET', headers: headers});
    let searchRes = await APIres.json();
    return searchRes;
    // console.log(searchRes);
}



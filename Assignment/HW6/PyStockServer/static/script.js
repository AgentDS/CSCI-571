const TextArea = document.getElementsByName('ticker_name')[0];
const SubmitButton = document.getElementById('submit_but');
const ResetButton = document.getElementById('reset_but');
const urlArrowDown = "/static/img/RedArrowDown.jpg";
const urlArrowUp = "/static/img/GreenArrowUp.jpg";

var searchResult = document.getElementsByClassName("search_result")[0];
var searchErrorResult = document.getElementsByClassName("error_search_result")[0];


function search(event) {
    let tickerName = TextArea.value.trim();
    let tickerNameLen = tickerName.length;

    if (tickerNameLen >= 1) {
        event.preventDefault();
        // get_news(tickerName);
        get_company_outlook(tickerName);
        // get_stock_summary(tickerName);
    }
    // else {
    //     event.preventDefault();
    //     alert('prevent is checked!')
    // }
}

function reset(event) {
    // event.preventDefault();
    showResult("off");
    showErrorResult("off");
}

function writeCompanyOutlook(response) {
    if (Object.keys(response).length === 0) {
        console.log("Empty JSON, no such stock");
        showResult("off");
        showErrorResult("on");
    } else {
        showErrorResult("off");
        showResult("on");
        var outlookContent = document.getElementById("outlook-content");
        var outlookTable = "<table>";
        outlookTable += "<tr><th>Company Name</th><td>" + response["name"] + "</td></tr>";
        outlookTable += "<tr><th>Stock Ticker Symbol</th><td>" + response["ticker"] + "</td></tr>";
        outlookTable += "<tr><th>Stock Exchange Code</th><td>" + response["exchangeCode"] + "</td></tr>";
        outlookTable += "<tr><th>Company Start Date</th><td>" + response["startDate"] + "</td></tr>";
        outlookTable += "<tr><th rowspan=\'5\'>Description</th><td rowspan=\'5\'><p>" + response["description"] + "</p></td></tr>";
        outlookTable += "<tr></tr><tr></tr><tr></tr><tr></tr></table>"

        outlookContent.innerHTML = outlookTable;
    }
}

function writeStockSummary(response) {
    if (Object.keys(response).length === 0) {
        console.log("Empty JSON, no such stock");
        showResult("off");
        showErrorResult("on");
    } else {
        showErrorResult("off");
        showResult("on");
        var summaryContent = document.getElementById("summary-content");
        var summaryTable = "<table>";
        summaryTable += "<tr><th>Stock Ticker Symbol</th><td>" + response["ticker"] + "</td></tr>";
        summaryTable += "<tr><th>Trading Day</th><td>" + response["timestamp"] + "</td></tr>";
        summaryTable += "<tr><th>Previous Closing Price</th><td>" + response["prevClose"] + "</td></tr>";
        summaryTable += "<tr><th>Opening Price</th><td>" + response["open"] + "</td></tr>";
        summaryTable += "<tr><th>High Price</th><td>" + response["high"] + "</td></tr>";
        summaryTable += "<tr><th>Low Price</th><td>" + response["low"] + "</td></tr>";
        summaryTable += "<tr><th>Last Price</th><td>" + response["last"] + "</td></tr>";
        summaryTable += "<tr><th>Change</th><td>" + response["change"];
        if (response["change"][0] === "-") {
            summaryTable += "<img src=\'" + urlArrowDown + "\' alt=\'ArrowDown\' ";
        } else {
            summaryTable += "<img src=\'" + urlArrowUp + "\' alt=\'ArrowUp\' ";
        }
        summaryTable += "class=\'table-img\'></td></tr>";
        summaryTable += "<tr><th>Change Percent</th><td>" + response["changePercent"];
        if (response["changePercent"][0] === "-") {
            summaryTable += "<img src=\'" + urlArrowDown + "\' alt=\'ArrowDown\' ";
        } else {
            summaryTable += "<img src=\'" + urlArrowUp + "\' alt=\'ArrowUp\' ";
        }
        summaryTable += "class=\'table-img\'></td></tr>";
        summaryTable += "<tr><th>Number of Shared Traded</th><td>" + response["volume"] + "</td></tr>";
        summaryTable += "</table>";

        summaryContent.innerHTML = summaryTable;
    }
}


function serverRequest(url, reqType, writeFunc) {
    let xhr = new XMLHttpRequest();
    console.log(reqType + " URL: " + url);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(reqType + " response received");
            console.log(reqType + " response length: " + xhr.responseText.length);
            writeFunc(JSON.parse(xhr.responseText));
        } else {
            console.error(xhr.statusText);
        }
    };
    xhr.open("GET", url, true);
    xhr.send();
}


function get_news(tickerName) {
    serverRequest("/api/v1.0/news/" + tickerName, "news");
}

function get_company_outlook(tickerName) {
    serverRequest("/api/v1.0/outlook/" + tickerName, "outlook", writeCompanyOutlook);
}


function get_stock_summary(tickerName) {
    serverRequest("/api/v1.0/summary/" + tickerName, "summary", writeStockSummary);
}

function showErrorResult(state) {
    if (state === "on") {
        searchErrorResult.style.display = "block";
    } else if (state === "off") {
        searchErrorResult.style.display = "none";
    } else {
        throw new Error("\'on\' or \'off\'");
    }
}

function showResult(state) {
    if (state === "on") {
        searchResult.style.display = "block";
    } else if (state === "off") {
        searchResult.style.display = "none";
    } else {
        throw new Error("\'on\' or \'off\'");
    }
}


SubmitButton.addEventListener("click", search, false)
ResetButton.addEventListener('click', reset, false)




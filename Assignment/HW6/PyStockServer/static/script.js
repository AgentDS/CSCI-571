const TextArea = document.getElementsByName('ticker_name')[0];
const SubmitButton = document.getElementById('submit_but');
const ResetButton = document.getElementById('reset_but');
const urlArrowDown = "/static/img/RedArrowDown.jpg";
const urlArrowUp = "/static/img/GreenArrowUp.jpg";


function obtain_stock_name(event) {
    let tickerName = TextArea.value.trim();
    let tickerNameLen = tickerName.length;

    if (tickerNameLen >= 1) {
        event.preventDefault();
        // get_news(tickerName);
        // get_company_outlook(tickerName);
        get_stock_summary(tickerName);
    }
    // else {
    //     event.preventDefault();
    //     alert('prevent is checked!')
    // }
}

function writeStockSummary(response) {
    if (Object.keys(response).length === 0) {
        console.log("Empty JSON, no such stock");
        var searchResult = document.getElementsByClassName("search_result")[0];
        searchResult.innerHTML = "<div class=\'error_msg\'>Error : No record has been found, please enter a valid symbol.</div>";
    } else {
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


function writeCompanyOutlook(response) {
    var outlookContent = document.getElementById("outlook-content");
    var outlookTable = document.createElement('table');
    var outlookTableInner = "";
}

function serverRequest(url, reqType, writeFunc) {
    let xhr = new XMLHttpRequest();
    console.log(reqType + " URL: " + url);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(reqType + " Response: " + xhr.responseText);
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
    serverRequest("/api/v1.0/outlook/" + tickerName, "outlook");
}


function get_stock_summary(tickerName) {
    serverRequest("/api/v1.0/iex/" + tickerName, "summary", writeStockSummary);
}


SubmitButton.addEventListener("click", obtain_stock_name, false)
// ResetButton.addEventListener('click')




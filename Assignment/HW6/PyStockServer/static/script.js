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
    var summaryContent = document.getElementById("summary-content");
    var summaryTable = document.createElement('table');
    var tableInner = "";
    tableInner += "<tr><th>Stock Ticker Symbol</th><td>" + response["ticker"] + "</td></tr>";
    tableInner += "<tr><th>Trading Day</th><td>" + response["timestamp"] + "</td></tr>";
    tableInner += "<tr><th>Previous Closing Price</th><td>" + response["prevClose"] + "</td></tr>";
    tableInner += "<tr><th>Opening Price</th><td>" + response["open"] + "</td></tr>";
    tableInner += "<tr><th>High Price</th><td>" + response["high"] + "</td></tr>";
    tableInner += "<tr><th>Low Price</th><td>" + response["low"] + "</td></tr>";
    tableInner += "<tr><th>Last Price</th><td>" + response["last"] + "</td></tr>";
    tableInner += "<tr><th>Change</th><td>" + response["change"];
    if (response["change"][0] === "-") {
        tableInner += "<img src=\'" + urlArrowDown + "\' alt=\'ArrowDown\' ";
    } else {
        tableInner += "<img src=\'" + urlArrowUp + "\' alt=\'ArrowUp\' ";
    }
    tableInner += "class=\'table-img\'></td></tr>";
    tableInner += "<tr><th>Change Percent</th><td>" + response["changePercent"];
    if (response["changePercent"][0] === "-") {
        tableInner += "<img src=\'" + urlArrowDown + "\' alt=\'ArrowDown\' ";
    } else {
        tableInner += "<img src=\'" + urlArrowUp + "\' alt=\'ArrowUp\' ";
    }
    tableInner += "class=\'table-img\'></td></tr>";
    tableInner += "<tr><th>Number of Shared Traded</th><td>" + response["volume"] + "</td></tr>";

    summaryTable.innerHTML = tableInner;
    summaryContent.appendChild(summaryTable);
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




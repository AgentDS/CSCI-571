const TextArea = document.getElementsByName('ticker_name')[0];
const SubmitButton = document.getElementById('submit_but');
const ResetButton = document.getElementById('reset_but');
var latest_news;
var stock_summary;
var company_outlook;


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
//
// function writeStockSummary(response) {
//
// }


function serverRequest(url, reqType, writeFunc) {
    let xhr = new XMLHttpRequest();
    console.log(reqType + " URL: " + url);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(reqType + " Response: " + xhr.responseText);
            writeFunc(xhr.responseText);
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
    serverRequest("/api/v1.0/iex/" + tickerName, "summary");
}


SubmitButton.addEventListener("click", obtain_stock_name, false)
// ResetButton.addEventListener('click')




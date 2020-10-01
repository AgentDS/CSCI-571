const TextArea = document.getElementsByName('ticker_name')[0];
const SubmitButton = document.getElementById('submit_but');
const ResetButton = document.getElementById('reset_but');
const urlArrowDown = "https://csci571.com/hw/hw6/images/RedArrowDown.jpg";
const urlArrowUp = "https://csci571.com/hw/hw6/images/GreenArrowUp.jpg";

var searchResult = document.getElementById("search_result");
var searchErrorResult = document.getElementById("error_search_result");
var outlookContent = document.getElementById("outlook-content");
var summaryContent = document.getElementById("summary-content");
var chartsContent = document.getElementById("charts-content");
var newsContent = document.getElementById("news-content");


function search(event) {
    let tickerName = TextArea.value.trim();
    let tickerNameLen = tickerName.length;
    if (tickerNameLen >= 1) {
        event.preventDefault();
        // get_company_outlook(tickerName);
        // get_stock_summary(tickerName);
        get_charts(tickerName);
        // get_news(tickerName);

    }
}

function reset(event) {
    showResult("off");
    showErrorResult("off");
}

// write and show outlook at first
function writeCompanyOutlook(response) {
    showErrorResult("off");
    showResult("off");
    if (Object.keys(response).length === 0) {
        console.log("Empty outlook JSON, no such stock");
        showErrorResult("on");
    } else {
        showOutlook("on");
        let outlookTable = "<table>";
        outlookTable += "<tr><th>Company Name</th><td>" + response["name"] + "</td></tr>";
        outlookTable += "<tr><th>Stock Ticker Symbol</th><td>" + response["ticker"] + "</td></tr>";
        outlookTable += "<tr><th>Stock Exchange Code</th><td>" + response["exchangeCode"] + "</td></tr>";
        outlookTable += "<tr><th>Company Start Date</th><td>" + response["startDate"] + "</td></tr>";
        outlookTable += "<tr><th rowspan=\'5\'>Description</th><td rowspan=\'5\'><p>" + response["description"] + "</p></td></tr>";
        outlookTable += "<tr></tr><tr></tr><tr></tr><tr></tr></table>";
        outlookContent.innerHTML = outlookTable;

        resetTabLinks();
        showResult("on");
    }
}


// write but not show summary at first
function writeStockSummary(response) {
    if (Object.keys(response).length === 0) {
        console.log("Empty summary JSON, no such stock");
    } else {
        showSummary("off");
        let summaryTable = "<table>";
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

// write but not show news at first
function writeLatestNews(response) {
    let newsArray = response["latest_news"];
    showNews("off");
    let latestNews = "";
    let newsNum = newsArray.length;
    let i;
    console.log("news number: " + newsNum);
    for (i = 0; i < newsNum; i++) {
        latestNews += "<div class=\'news-box\'><div class=\'center-crop-img\'>";
        latestNews += "<img class=\'news-img\' alt=\'urlImage\' src=\'" + newsArray[i]["urlToImage"] + "\'/></div>";
        latestNews += "<div class=\'news-text\'><p><b>" + newsArray[i]["title"] + "</b></p>";
        latestNews += "<p>Published Date: <span>" + newsArray[i]["publishedAt"] + "</span></p>";
        latestNews += "<p><a href=\'" + newsArray[i]["url"] + "\' target=\"_blank\">See Original Post</a></p>";
        latestNews += "</div></div>";
    }
    newsContent.innerHTML = latestNews;
}

function writeCharts(response) {
    let histData = response["hist_data"]; // [[date, close, volume], [date, close, volume], ....]
    let tickerName = response['ticker_name'];
    let currentDate = response['current_date'];
    console.log("ticker name:" + tickerName);

    // split the data set into close and volume
    let volume = [], close = [], dataLength = histData.length;
    let i;

    for (i = 0; i < dataLength; i += 1) {
        close.push([
            histData[i][0], // the date
            histData[i][1] // close
        ]);

        volume.push([
            histData[i][0], // the date
            histData[i][2] // the volume
        ]);
    }

    // Highcharts.setOptions({
    //     time: {
    //         /**
    //          * Use moment-timezone.js to return the timezone offset for individual
    //          * timestamps, used in the X axis labels and the tooltip header.
    //          */
    //         getTimezoneOffset: function (timestamp) {
    //             var zone = 'America/Los_Angeles',
    //                 timezoneOffset = -moment.tz(timestamp, zone).utcOffset();
    //
    //             return timezoneOffset;
    //         }
    //     }
    // });

    // TODO: create the chart
    Highcharts.stockChart('charts-content', {
        stockTools: {
            gui: {
                enabled: false // disable the built-in toolbar
            }
        },

        xAxis: {
            type: 'datetime',
            labels: {
                format: '{value:%e. %b}'
            }
        },

        yAxis: [{
            title: {
                text: 'Volume'
            },
        }, {
            title: {
                text: 'Stock Price'
            },
            opposite: false
        }],

        plotOptions: {
            column: {
                pointWidth: 2,
                color: '#404040'
            }
        },

        rangeSelector: {
            buttons: [{
                type: 'day',
                count: 7,
                text: '7d'
            }, {
                type: 'day',
                count: 15,
                text: '15d'
            }, {
                type: 'month',
                count: 1,
                text: '1m'
            }, {
                type: 'month',
                count: 3,
                text: '3m'
            }, {
                type: 'month',
                count: 6,
                text: '6m'
            }],
            selected: 4,
            inputEnabled: false
        },

        title: {
            text: 'Stock Price ' + tickerName + ' ' + currentDate
        },

        subtitle: {
            text: '<a href="https://api.tiingo.com/" target="_blank">Sourse: Tiingo</a>',
            useHTML: true
        },

        series: [{
            type: 'column',
            name: tickerName + ' Volume',
            data: volume,
            yAxis: 0,
            showInNavigator: false
        }, {
            type: 'area',
            name: tickerName,
            data: close,
            yAxis: 1,
            showInNavigator: true,
            gapSize: 5,
            tooltip: {
                valueDecimals: 2
            },
            fillColor: {
                linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1
                },
                stops: [
                    [0, Highcharts.getOptions().colors[0]],
                    [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                ]
            },
            threshold: null
        }]


    });


    showCharts("on");
    showResult("on");

    let charts = "";


    // chartsContent.innerHTML = response;
}

function serverRequest(url, reqType, writeFunc) {
    let xhr = new XMLHttpRequest();
    console.log(reqType + " URL: " + url);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(reqType + " response received");
            // console.log(reqType + " response type: " + typeof (xhr.responseText));
            // console.log(reqType + " response length: " + xhr.responseText.length);
            writeFunc(JSON.parse(xhr.responseText));
        } else {
            console.error(xhr.statusText);
        }
    };
    xhr.open("GET", url, true);
    xhr.send();
}


function get_news(tickerName) {
    serverRequest("/api/v1.0/news/" + tickerName, "news", writeLatestNews);
}

function get_company_outlook(tickerName) {
    serverRequest("/api/v1.0/outlook/" + tickerName, "outlook", writeCompanyOutlook);
}


function get_stock_summary(tickerName) {
    serverRequest("/api/v1.0/summary/" + tickerName, "summary", writeStockSummary);
}

function get_charts(tickerName) {
    serverRequest("/api/v1.0/charts/" + tickerName, "charts", writeCharts);  // TODO: need to replace with serverRequest
}

function showErrorResult(state) {
    if (state === "on") {
        searchErrorResult.style.display = "block";
    } else if (state === "off") {
        searchErrorResult.style.display = "none";
    } else {
        throw new Error("searchErrorResult state \'on\' or \'off\'");
    }
}

function showResult(state) {
    if (state === "on") {
        searchResult.style.display = "block";
    } else if (state === "off") {
        searchResult.style.display = "none";
    } else {
        throw new Error("searchResult state \'on\' or \'off\'");
    }
}

function showSummary(state) {
    if (state === "on") {
        summaryContent.style.display = "block";
    } else if (state === "off") {
        summaryContent.style.display = "none";
    } else {
        throw new Error("summaryContent state \'on\' or \'off\'");
    }
}

function showNews(state) {
    if (state === "on") {
        newsContent.style.display = "block";
    } else if (state === "off") {
        newsContent.style.display = "none";
    } else {
        throw new Error("newsContent state \'on\' or \'off\'");
    }
}

function showOutlook(state) {
    if (state === "on") {
        outlookContent.style.display = "block";
    } else if (state === "off") {
        outlookContent.style.display = "none";
    } else {
        throw new Error("outlookContent state \'on\' or \'off\'");
    }
}

function showCharts(state) {
    if (state === "on") {
        chartsContent.style.display = "block";
    } else if (state === "off") {
        chartsContent.style.display = "none";
    } else {
        throw new Error("chartsContent state \'on\' or \'off\'");
    }
}

function checkErrorResultDisplay() {
    if (searchErrorResult.style.display === "block") {
        return "on";
    } else if (searchErrorResult.style.display === "none") {
        return "off";
    } else {
        throw new Error("Invalid searchErrorResult.style.display=" + searchErrorResult.style.display + ", should be \'none\' or \'block\'")
    }
}

function openTab(evt, tabName) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");

    if (checkErrorResultDisplay() === "off") {
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }

        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(tabName).style.display = "block";
        evt.currentTarget.className += " active";
    }
}

function resetTabLinks() {
    let tablinks, i, outlookLink;
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    outlookLink = document.getElementsByClassName("tablinks")[0];
    outlookLink.className = "tablinks active";
}


SubmitButton.addEventListener("click", search, false)
ResetButton.addEventListener('click', reset, false)




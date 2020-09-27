const TextArea = document.getElementsByName('ticker_name')[0];
const SubmitButton = document.getElementById('submit_but');
const ResetButton = document.getElementById('reset_but');


function obtain_stock_name(event) {
    let tickerName = TextArea.value.trim();
    let tickerNameLen = tickerName.length;
    if (tickerNameLen >= 1) {
        event.preventDefault();
        // let latest_news = get_news(tickerName);
        let company_outlook = get_company_outlook(tickerName);
    }
    // else {
    //     event.preventDefault();
    //     alert('prevent is checked!')
    // }
}


function get_news(tickerName) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/v1.0/news/" + tickerName, true);
    console.log("news URL: " + "/api/v1.0/news/" + tickerName);
    xhr.send();
    console.log("News XHR sent: \'ticker_name=" + tickerName + "\'");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log("News Response: " + xhr.responseText);
            return xhr.responseText;
        } else {
            console.error(xhr.statusText);
            return false;
        }
    }
}

function get_company_outlook(tickerName) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/v1.0/outlook/" + tickerName, true);
    console.log("Company outlook URL: " + "/api/v1.0/outlook/" + tickerName);
    xhr.send();
    console.log("Outlook XHR sent: \'ticker_name=" + tickerName + "\'");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log("Outlook Response: " + xhr.responseText);
            return xhr.responseText;
        } else {
            console.error(xhr.statusText);
            return false;
        }
    }
}


SubmitButton.addEventListener("click", obtain_stock_name, false)
// ResetButton.addEventListener('click')




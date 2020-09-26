const TextArea = document.getElementsByName('ticker_name')[0];
const SubmitButton = document.getElementById('submit_but');
const ResetButton = document.getElementById('reset_but');


function obtain_stock_name(event) {
    let tickerName = TextArea.value;
    let tickerNameLen = tickerName.length;
    if (tickerNameLen >= 1) {
        event.preventDefault();
        var xhr = new XMLHttpRequest();
        var ll = "/api/v1.0/search"
        xhr.open("GET", ll)
        console.log("URL: " + ll)
        xhr.send("ticker_name=" + tickerName);
        console.log("XMLHTTPRequest is sent: \'ticker_name=" + tickerName + "\'");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                console.log("HTTP request from script finished");
                if (xhr.status === 200) {
                    console.log("status=200, response text: " + xhr.responseText);
                } else {
                    console.log("status != 200")
                    console.error(xhr.statusText);
                }
            }
        }


    }
    // else {
    //     event.preventDefault();
    //     alert('prevent is checked!')
    // }
}

SubmitButton.addEventListener("click", obtain_stock_name, false)
// ResetButton.addEventListener('click')




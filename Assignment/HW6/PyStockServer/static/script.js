const TextArea = document.getElementsByName('ticker_name')[0];
const SubmitButton = document.getElementById('submit_but');
const ResetButton = document.getElementById('reset_but');


function obtain_stock_name(event) {
    let tickerName = TextArea.value;
    let tickerNameLen = tickerName.length;
    if (tickerNameLen >= 1) {
        event.preventDefault();
        console.log('The entered ticker name is:' + tickerName);
    } else {
        event.preventDefault();
        alert('prevent is checked!')
    }
}

SubmitButton.addEventListener("click", obtain_stock_name, false)
// ResetButton.addEventListener('click')




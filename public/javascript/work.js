const salary = 100;

let payText = document.getElementById("pay");

let work = function() {
    payText.innerText = salary + parseInt(payText.innerText, 10);
}

let bank = function() {
    let pay = parseInt(payText.innerText, 10);
    if(pay === 0) {
        alert("No pay!");
        return;
    }
    let loanAmount = parseInt(document.getElementById("loan-amount").innerText, 10);
    if(loanAmount > 0) {
        let returnValue = repayLoan(pay / 10);
        pay = returnValue + (pay - pay / 10);
    }

    setBalance(pay);
    payText.innerText = 0;
}

let repay = function() {
    let pay = parseInt(payText.innerText, 10);
    if(pay === 0) {
        alert("No pay!");
        return;
    } else if(document.getElementById("loan-amount").innerText > 0) {
        let returnValue = repayLoan(pay);
        payText.innerText = returnValue;
    }

}

document.querySelector("#bankButton").addEventListener("click", bank)
document.querySelector("#workButton").addEventListener("click", work)
document.querySelector("#repayButton").addEventListener("click", repay)

const salary = 100;

let payText = document.getElementById("pay");

/**
* Fires up when the user clicks the work button.
* This adds 100 in currenny to the payment text.
*/
let work = function() {
    payText.innerText = salary + parseInt(payText.innerText, 10);
}

/**
* Fires up when the user clicks the bank button.
* This adds the current payment to the users bank balance.
* IF the user has a loan then 10% of the payment is subtracted
* to pay off the loan.
*/
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

/**
* Fires up when the user clicks the repay button.
* This takes the full payment and subtracts it from the
* users current loan.
*/
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

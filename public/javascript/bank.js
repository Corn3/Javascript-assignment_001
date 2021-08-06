let bankBalance = 200;
let loanAmount = 0;
let loaned = false;
const balanceText = document.getElementById("balance");
const loanText = document.getElementById("loan-amount");
balanceText.textContent = bankBalance;

/**
* Changes the visibility of the loan elements,
* and the repay button depending on if a loan
* exists or not.
*/
function changeVisibility() {
    let classToAdd;
    let classToRemove;
    if(loaned){
        classToAdd = "visible";
        classToRemove = "hidden";
    } else {
        classToAdd = "hidden";
        classToRemove = "visible";
    }
    changeVisibilityForId(classToAdd, classToRemove, "loan");
    changeVisibilityForId(classToAdd, classToRemove, "repayButton");
    

}

/**
* Helper method to reduce code duplication for changing of visibility.
*/
function changeVisibilityForId(classToAdd, classToRemove, id) {
    document.getElementById(id).classList.remove(classToRemove);
    document.getElementById(id).classList.add(classToAdd);
}

/**
* The function that is fired up when the loan button is clicked.
* Depending on a number of conditions the user will be able to take a loan,
* otherwise the program will alert the user that the loan was unsuccessful.
*/
let loan = function() {
    if(loaned !== false) {
        alert("Can't take a loan until you have paid back your previous loan.");
        return;
    }
    loanAmount = prompt("Loan amount:", "");
    if(loanAmount === null) {
        return;
    }
    loanAmount = parseInt(loanAmount, 10);
    if(loanAmount > bankBalance * 2) {
        alert("Loan can't be higher than double your current balance.");
        return;
    } else if (loanAmount === 0) {
        return;
    }
    
    balanceText.textContent = bankBalance += loanAmount;
    loaned = true;
    loanText.textContent = loanAmount;
    changeVisibility();
}

/**
* Repays the loan which the user has previously taken.
* Depending on the argument passed in the parameter, 
* either the full amount is repayed, or only part of it is.
* A function that is called from the work.js file.
*/
function repayLoan(repayAmount) {
    if(loanAmount > repayAmount) {
        loanText.innerText = loanAmount - repayAmount;
        loanAmount -= repayAmount;
        return 0;
    } else {
        let returnAmount = repayAmount - loanAmount;
        loanText.innerText = loanAmount = 0;
        loaned = false;
        changeVisibility();
        return returnAmount;
    }
}

function isBalanceHighEnough(cost) {
    return bankBalance >= cost;
}

function payment(cost) {
    bankBalance -= cost;
    balanceText.innerText = bankBalance;
}

function setBalance(balance) {
    bankBalance += balance;
    balanceText.innerText = bankBalance;
}

document.querySelector("#loanButton").addEventListener("click", loan);

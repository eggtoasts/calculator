const clearButton = document.querySelector("#C");
const sign = document.querySelector(".sign");
const percent = document.querySelector(".percent");

const numbers = document.querySelectorAll(".number");

const operators = document.querySelectorAll(".op");

const equal = document.querySelector("#eq");

const del = document.querySelector("#del");

const outcomeText = document.querySelector("#outcome-text");

const numberList = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const operatorList = ["plus", "mult", "sub", "add", "eq", "del"];

//first and second -> if undefined, it's "0"
let first = undefined,
  second = undefined,
  currentOperation = undefined,
  needOperator = false;

function operatorSign(op) {
  switch (op) {
    case "sub":
      return "-";
    case "mult":
      return "x";
    case "plus":
      return "+";
    case "divide":
      return "/";
  }
}

function displayScreen(first, second, currentOperation) {
  if (first == undefined) {
    outcomeText.textContent = "0";
    return;
  }
  outcomeText.textContent =
    `${first} ` +
    (currentOperation == undefined ? "" : operatorSign(currentOperation)) +
    (second == undefined ? "" : ` ${second}`);
}

function displayPrevious(x) {
  return;
}

function displayAnswer(x) {
  let len = String(x).length;

  //   let a = len * 2.6;
  let b = len * 3.5;
  let c = len * 3.3;
  let d = len * 3;

  if (len <= 6) {
    outcomeText.style.fontSize = `${96}px`;
  } else if (len <= 13) {
    outcomeText.style.fontSize = `${96 - b}px`;
  } else if (len <= 20) {
    outcomeText.style.fontSize = `${96 - c}px`;
  } else {
    outcomeText.style.fontSize = `${96 - d}px`;
  }
  console.log(len);

  if (x == undefined) {
    outcomeText.textContent = 0;
    outcomeText.style.fontSize = `${96}px`;
  } else outcomeText.textContent = x;
}

function concatNumbers(currNumber, x) {
  if (x == undefined) {
    if (Number(x) == 0) return undefined;
    x = Number(currNumber);
  } else {
    x = Number(x) * Number(10) + Number(currNumber);
  }

  console.log("concat... " + x);

  return x;
}

function deleteDigit(x) {
  if (x == undefined) {
    return undefined;
  } else {
    x = Math.floor(Number(x) / 10);
  }

  if (x == 0) x = undefined;

  console.log("after deletion..." + x);

  return x;
}

//There will be two types of cases for deletion:
//if the current number we're in is NOT undefined -> remove last digit
//              if we deleted the LAST digit --> 0 --> it turns to undefined again, but not clear()

//if we chose an operation, remove that operation

//if we have NOT chosen an operation, and second IS undefined, and we needOperation = true --> clear()

del.addEventListener("click", (e) => {
  if (second != undefined) {
    //take care of second number
    second = deleteDigit(second);
  } else if (first != undefined && currentOperation == undefined) {
    //take care of first number
    first = deleteDigit(first);
  } else if (currentOperation != undefined) {
    console.log("del curr op");
    currentOperation = undefined;
    needOperator = false;
    //delete curr operation
  }
  if (
    currentOperation == undefined &&
    second == undefined &&
    needOperator == true
  ) {
    console.log("delete everything twin");
    //clear all numbers
    clear();
    displayAnswer(first);
  }

  displayScreen(first, second, currentOperation);
});

//Reads the number that is clicked on to concatenate if we don't have a chosen operator yet.
numbers.forEach((number) =>
  number.addEventListener("click", (e) => {
    const currNumber = e.target.id;

    //if the first or second number is greater than 9 digits, we let the user know we canot add any further.

    //We calculate first and second if we have an operator
    if (currentOperation != undefined) {
      //We concatenate our second number
      if (second != undefined && String(second).length > 8) {
        console.log("Second be less than 9 digits.");
        return;
      }
      second = concatNumbers(currNumber, second);
      displayScreen(first, second, currentOperation);
      return;
    }

    //If we need an operator and our op is undefined, we don't go any further.
    if (needOperator == true) return;

    //We concatenate our first number

    if (first != undefined && String(first).length > 8) {
      console.log("Must be less than 9 digits.");
      return;
    }

    first = concatNumbers(currNumber, first);
    displayScreen(first, second, currentOperation);
  })
);

//Operator event
operators.forEach((op) =>
  op.addEventListener("click", (e) => {
    if (first === undefined) return;

    //We set our current operation
    if (e.target.id != "eq" && e.target.id != "del")
      currentOperation = e.target.id;

    console.log("current op :" + currentOperation);

    displayScreen(first, second, currentOperation);
  })
);

//Our operations
function add(a, b) {
  return a + b;
}

function sub(a, b) {
  return a - b;
}
function divide(a, b) {
  return a / b;
}
function mult(a, b) {
  return a * b;
}

equal.addEventListener("click", (e) => {
  if (first !== undefined && second !== undefined) {
    console.log("current op after pressing eq: " + currentOperation);
    switch (currentOperation) {
      case "plus":
        first = add(first, second);
        break;
      case "sub":
        first = sub(first, second);
        break;
      case "divide":
        first = divide(first, second);
        break;
      case "mult":
        first = mult(first, second);
        break;
    }

    //Next number and current operation is empty
    second = undefined;
    currentOperation = undefined;

    console.log(" its " + first);
    displayAnswer(first);

    //The next action must involve an operator.
    needOperator = true;
  }
});

//returns index of array
function findNumber(num) {
  return numberList.find(num);
}

clearButton.addEventListener("click", (e) => {
  clear();
  displayAnswer(first);
});

//Restarts
function clear() {
  first = undefined;
  second = undefined;
  currentOperation = undefined;
  needOperator = false;
}

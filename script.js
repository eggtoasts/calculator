const clear = document.querySelector(".C");
const sign = document.querySelector(".sign");
const percent = document.querySelector(".percent");

const numbers = document.querySelectorAll(".number");

const operators = document.querySelectorAll(".op");

const equal = document.querySelector("#eq");

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

let first = undefined,
  second = undefined,
  currentOperation = undefined,
  needOperator = false;

function concatNumbers(currNumber, x) {
  if (x == undefined) {
    if (Number(x) == 0) return undefined;
    x = Number(currNumber);
  } else {
    x = Number(x) * Number(10) + Number(currNumber);
  }

  console.log(x);

  return x;
}

//Reads the number that is clicked on to concatenate if we don't have a chosen operator yet.
numbers.forEach((number) =>
  number.addEventListener("click", (e) => {
    const currNumber = e.target.id;

    //We calculate first and second if we have an operator
    if (currentOperation != undefined) {
      //We concatenate our second number
      second = concatNumbers(currNumber, second);
      return;
    }

    //If we need an operator and our op is undefined, we don't go any further.
    if (needOperator == true) return;

    //We concatenate our first number
    first = concatNumbers(currNumber, first);
  })
);

//Operator event
operators.forEach((op) =>
  op.addEventListener("click", (e) => {
    if (first === undefined) return;

    //We set our current operation
    if (e.target.id != "eq") currentOperation = e.target.id;
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
    console.log(currentOperation);
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

    second = undefined;
    currentOperation = undefined;

    console.log(" its " + first);

    //The next action must involve an operator.
    needOperator = true;
  }
});

//returns index of array
function findNumber(num) {
  return numberList.find(num);
}

//Restarts
function clear() {
  [first, second, currentOperation] = [undefined, undefined, undefined];
}

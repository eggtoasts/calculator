const C = document.querySelector(".C");
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
    x = Number(currNumber);
  } else {
    x = Number(x) * Number(10) + Number(currNumber);
  }

  console.log(x);

  return x;
}

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
    currentOperation = e.target.id;
  })
);

equal.addEventListener("click", (e) => {
  if (first !== undefined && second !== undefined) {
    first += second;

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

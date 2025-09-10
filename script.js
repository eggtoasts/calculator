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

let calc = {
  first: undefined,
  second: undefined,
  currentOperation: undefined,
  needOperator: false,
};

function concatNumbers(currNumber, calc, x) {
  if (calc[x] == undefined) {
    calc[x] = Number(currNumber);
  } else {
    calc[x] = Number(calc[x]) * Number(10) + Number(currNumber);
  }
  console.log(calc[x]);
  console.log(numberList[currNumber]);
}

numbers.forEach((number) =>
  number.addEventListener("click", (e) => {
    const currNumber = e.target.id;

    //We calculate first and second if we have an operator
    if (calc.currentOperation != undefined) {
      //We concatenate our second number
      concatNumbers(currNumber, calc, `second`);
      return;
    }

    //If we need an operator and our op is undefined, we don't go any further.
    if (calc.needOperator == true) return;

    //We concatenate our first number
    concatNumbers(currNumber, calc, `first`);
  })
);

//Operator event
operators.forEach((op) =>
  op.addEventListener("click", (e) => {
    if (calc.first === undefined) return;

    //We set our current operation
    calc.currentOperation = e.target.id;
  })
);

equal.addEventListener("click", (e) => {
  if (calc.first !== undefined && calc.second !== undefined) {
    calc.first += calc.second;

    calc.second = undefined;
    calc.currentOperation = undefined;

    console.log(" its " + calc.first);

    //The next action must involve an operator.
    calc.needOperator = true;
  }
});

//returns index of array
function findNumber(num) {
  return numberList.find(num);
}

//Restarts
function clear() {
  [calc.first, calc.second, calc.currentOperation] = [
    undefined,
    undefined,
    undefined,
  ];
}

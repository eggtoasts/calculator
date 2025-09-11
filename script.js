const clearButton = document.querySelector("#C");
const sign = document.querySelector("#sign");
const percent = document.querySelector(".percent");

const numbers = document.querySelectorAll(".number");

const operators = document.querySelectorAll(".op");

const equal = document.querySelector("#eq");

const del = document.querySelector("#del");

const outcomeText = document.querySelector("#outcome-text");
const previousText = document.querySelector("#previous-text");

let previousAns = 0;

//first and second -> if undefined, it's "0"
let first = undefined,
  second = undefined,
  currentOperation = undefined,
  needOperator = false;

//Converts our current opreator string to its synbol for display
function operatorSign(op) {
  switch (op) {
    case "sub":
      return "-";
    case "mult":
      return "×";
    case "plus":
      return "+";
    case "divide":
      return "/";
    case "modulo":
      return "%";
    case "eq":
      return "Enter";
    case "del":
      return "Backspace";
  }
}

//If we're on the first number and haven't inputted an operator-> toggle first
//If we're on second -> toggle second

sign.addEventListener("click", (e) => {
  console.log(second);
  if (second != undefined) {
    second = -second;
  } else if (first != undefined && currentOperation == undefined) {
    first = -first;
  }
});

function displayScreen(first, second, currentOperation) {
  if (first == undefined) {
    outcomeText.textContent = "0";
    return;
  }

  outcomeText.textContent =
    `${first} ` +
    (currentOperation == undefined ? "" : operatorSign(currentOperation)) +
    (second == undefined
      ? ""
      : second < 0
      ? `(-` + `${-second})`
      : ` ${second}`);
}

function displayPreviousAnswer(x) {
  if (currentOperation == undefined && needOperator == false)
    previousText.textContent = `Ans = 0`;
  else previousText.textContent = `Ans = ${previousAns}`;
}

function displayPreviousEquation() {
  previousText.textContent = outcomeText.textContent;
}

//Displays current calculation in the outcome container
//Also changes font size depending on the answer's length
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

function deleteDecimalDigit(x) {
  let arr = String(x).split(".")[1];
  let len = String(x).split(".")[1].length - 1;

  console.log("len " + len);
  let newX = String(x).split(".")[0] + ".";
  for (let i = 0; i < len; i++) {
    newX += arr[i];
  }
  x = newX;

  console.log(x);

  return String(x);
}

function deleteDigit(x) {
  console.log("before" + x);

  if (x == undefined) {
    return undefined;
  } else {
    if (
      //Checks if our number x is a decimal.
      checkIfDecimal(Number(x)) == true
    ) {
      return deleteDecimalDigit(x);
    } else if (x[x.length - 1] == ".") {
      return Number(x);

      //For case where there are trailing zeros (X.0000)
    } else if (checkIfDecimal(String(x)) == true) {
      return deleteDecimalDigit(x);
    }

    if (x < 0) {
      x = Math.ceil(Number(x) / 10);
    } else {
      x = Math.floor(Number(x) / 10);
    }
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
  if (first == undefined && second == undefined) {
    displayPreviousAnswer(0);
    clear();
  }
  if (second != undefined) {
    //take care of second number
    second = deleteDigit(second);
  } else if (first != undefined && currentOperation == undefined) {
    //take care of first number
    console.log("called:" + first);
    first = deleteDigit(first);
    console.log("after call:" + first);
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

//Returns true if it's a decimal, false otherwise
function checkIfDecimal(x) {
  let b = String(x);
  return b.split("").filter((e) => e == ".").length == 1;
}

let clickEvent = new Event("click");
document.addEventListener("keydown", (e) => {
  let key = e.key;

  if (
    key === "Backspace" ||
    key === "Enter" ||
    key == "-" ||
    key == "+" ||
    key == "/" ||
    key == "%" ||
    key == "*"
  ) {
    operators.forEach((op) => {
      if (key == "*") key = "×";
      //   console.log("key : " + key + " and id " + operatorSign(op.id));
      if (key == operatorSign(op.id)) {
        op.dispatchEvent(clickEvent);
      }
    });
  }

  if ((key >= "0" && key <= "9") || key == ".") {
    numbers.forEach((number) => {
      if (key == ".") key = "decimal";
      if (key == number.id) {
        number.dispatchEvent(clickEvent);
      }
    });
  }
});

//Reads the number that is clicked on to concatenate if we don't have a chosen operator yet.
numbers.forEach((number) =>
  number.addEventListener("click", (e) => {
    const currNumber = e.target.id;

    console.log(currNumber);

    //This is for when we have inputted a number,
    // and the second or first operand contains a decimal:
    if (second != undefined && checkIfDecimal(second) == true) {
      //To avoid overflowing (10^-9 is the limit)
      if (
        String(second).split(".") != undefined &&
        String(second).split(".")[1].length >= 9
      ) {
        console.log("Cannot add more.");
        return;
      }
      if (currNumber == "decimal") return;
      if (currNumber == "0") {
        second = String(second + "0");
        displayScreen(first, String(second), currentOperation);
        return;
      }
      second = Number(second + currNumber);
      displayScreen(first, second, currentOperation);

      return;
    } else if (
      currentOperation == undefined &&
      first != undefined &&
      checkIfDecimal(first) == true
    ) {
      //Cannot add another decimal if we already have one.
      if (currNumber == "decimal") return;

      //To avoid overflowing (10^-9 is the limit)
      if (
        String(first).split(".") != undefined &&
        String(first).split(".")[1].length >= 9
      ) {
        console.log("Cannot add more.");
        return;
      }

      //Once calculated, we cannot modify the number
      if (needOperator == true) {
        console.log("You need an operator.");
        return;
      }

      if (currNumber == "0") {
        first = String(first + "0");
        displayScreen(String(first), second, currentOperation);
        return;
      }
      first = Number(first + currNumber);
      displayScreen(first, second, currentOperation);
      return;
    }

    //We're adding a decimal.
    if (currNumber == "decimal") {
      if (
        previousAns != 0 &&
        previousAns == first &&
        currentOperation == undefined
      )
        return;
      if (second != undefined) {
        second += ".";

        displayScreen(first, second, currentOperation);
        return;
      } else if (first != undefined && currentOperation == undefined) {
        first += ".";

        displayScreen(first, second, currentOperation);
        return;
      } else {
        //If first and second operand are zeros, we make it a string "0." for handling.
        if (first == undefined) {
          first = "0.";
          displayScreen(String(first), second, currentOperation);
        } else if (second == undefined) {
          second = "0.";
          displayScreen(first, String(second), currentOperation);
        }

        return;
      }
    }

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
    if (needOperator == true) {
      console.log("You need an operator.");
      return;
    }

    if (first != undefined && String(first).length > 8) {
      console.log("Must be less than 9 digits.");
      return;
    }

    //We concatenate our first number
    first = concatNumbers(currNumber, first);
    displayScreen(first, second, currentOperation);
  })
);

//Operator event
operators.forEach((op) =>
  op.addEventListener("click", (e) => {
    if (first === undefined) return;

    //We set our current operation (must be +, -, /, *)
    if (e.target.id != "eq" && e.target.id != "del" && e.target.id != "sign")
      currentOperation = e.target.id;

    console.log("current op :" + currentOperation);

    displayScreen(first, second, currentOperation);

    // //--------------------
    // if (needOperator == undefined) needOperator == true;
    // else needOperator == false;

    //We also display our previous answer if this is not our first calculation.
    if (needOperator == true) displayPreviousAnswer(first);
  })
);

//Our operations
function add(a, b) {
  return a + b;
}

//accounts for negative modulo
function mod(a, b) {
  return ((a % b) + b) % b;
}

function sub(a, b) {
  return a - b;
}
function divide(a, b) {
  //divide by zero case
  return a / b;
}
function mult(a, b) {
  return a * b;
}

equal.addEventListener("click", (e) => {
  //   if (first !== undefined && second === undefined) return;

  if (first !== undefined && second !== undefined) {
    console.log("current op after pressing eq: " + currentOperation);

    let a = Number(first),
      b = Number(second);
    switch (currentOperation) {
      case "plus":
        first = add(a, b);
        break;
      case "sub":
        first = sub(a, b);
        break;
      case "divide":
        //divide by zero case
        if (b == 0) return;
        first = divide(a, b);
        break;
      case "mult":
        first = mult(a, b);
        break;
      case "modulo":
        first = mod(a, b);
        break;
    }

    //to avoid floating point arithmetic errors

    first = Number(first.toPrecision(12));
    //Next number and current operation is empty
    second = undefined;
    currentOperation = undefined;

    console.log(" its " + first);

    //Displays previous equation and current answer.
    displayPreviousEquation();
    displayAnswer(first);
    console.log(first);
    previousAns = first;

    //The next action must involve an operator.
    needOperator = true;
  }
});

//Returns index of array
function findNumber(num) {
  return numberList.find(num);
}

clearButton.addEventListener("click", (e) => {
  console.log(previousAns);
  //Displays previous answer
  displayPreviousAnswer(String(previousAns));

  //Clear
  clear();
  displayAnswer(first);
});

//Restarts
function clear() {
  first = undefined;
  second = undefined;
  currentOperation = undefined;
  needOperator = false;
  previousAns = 0;
}

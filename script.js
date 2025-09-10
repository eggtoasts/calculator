const C = document.querySelector(".C");
const sign = document.querySelector(".sign");
const percent = document.querySelector(".percent");

const numbers = document.querySelectorAll(".number");

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

const operators = ["plus", "mult", "sub", "add", "eq", "del"];
let first = undefined,
  second = undefined,
  waitingForOp = true;

numbers.forEach((number) =>
  number.addEventListener("click", (e) => {
    const currNumber = e.target.id;

    if (first == undefined) {
      first = Number(currNumber);
    } else {
      if (waitingForOp == true) {
        first = Number(first) * Number(10) + Number(currNumber);
      }
    }
    console.log(first);
    console.log(numberList[currNumber]);
  })
);

//returns index of array
function findNumber(num) {
  return numberList.find(num);
}

function clear() {
  [first, second, waitingForOp] = [undefined, undefined, undefined];
}

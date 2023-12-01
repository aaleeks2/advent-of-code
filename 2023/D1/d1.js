const fs = require("fs");

const DIGITS_BY_STRING = {
  "one": 1,
  "two": 2,
  "three": 3,
  "four": 4,
  "five": 5,
  "six": 6,
  "seven": 7,
  "eight": 8,
  "nine": 9
};

fs.readFile("input.txt", "utf-8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data.split("\n").reduce(callbackFn2, 0));
});

// Part 1
callbackFn1 = (accumulator, line) => {
  const digits = line.match(/[0-9]/g);
  
  const val = digits.length > 1
    ? "" + digits[0] + digits[digits.length - 1]
    : "" + digits[0] + digits[0];

  return accumulator + Number(val);
}

// Part 2
callbackFn2 = (accumulator, line) => {
  const lineReversed = line.split("").reverse().join("");
  const digits = line.match(/[0-9]|one|two|three|four|five|six|seven|eight|nine/g);
  const digitsReversed = lineReversed.match(/[0-9]|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin/g);

  if(digits.length == 0) {
    return accumulator + 0;
  }

  let first = String(digits[0]);
  if(first.match(/[0-9]/g) == null) {
    first = DIGITS_BY_STRING[first];
  }

  let num = digits.length + digitsReversed.length;
  if(num < 3) {
    return accumulator + Number([first, first].join(""));
  }

  let last = String(digitsReversed[0]);
  if(last.match(/[0-9]/g) == null) {
    last = DIGITS_BY_STRING[last.split("").reverse().join("")];
  }

  return accumulator + Number([first, last].join(""));
}
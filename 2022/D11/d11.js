const fs = require("fs");
const IS_TEST = true;
const INPUT = 'input.txt';
const TEST_INPUT = 'test_input.txt';

fs.readFile(IS_TEST ? TEST_INPUT : INPUT, "utf-8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  part1(data);
});

part1 = (data) => {
    
};

isDivisibleBy = (number, divisor) => {
    return number % divisor == 0;
}
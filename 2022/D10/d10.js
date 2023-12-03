const fs = require('fs');
const IS_TEST = false;
const INPUT = 'input.txt';
const INPUT_TEST = 'test_input.txt';
const ENCODING_UTF_8 = 'utf-8';
const NEW_LINE = '\n';
const SPACE = ' ';
const NOOP = 'noop';
const THRESHOLDS = [20, 60, 100, 140, 180, 220];
let cycles = 0;
let sum = 0;

fs.readFile(IS_TEST ? INPUT_TEST : INPUT, ENCODING_UTF_8, (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
   
    data.split(NEW_LINE).reduce(callback, 1);
    console.log(`Sum: ${sum}`);
});

// Part 1
callback = (accumulator, line) => {
    const splittedLine = line.trim().split(SPACE);
    for(let i = 0; i < (splittedLine[0] == NOOP ? 1 : 2); ++i) {
        cycles++;
        if(THRESHOLDS.includes(cycles)) {
            sum += accumulator * cycles;
        }
    }
    return accumulator + (splittedLine[0] != NOOP ? parseInt(splittedLine[1]) : 0);
};
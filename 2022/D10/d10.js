const fs = require('fs');
const IS_TEST = true;
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
   
    console.log(`X: ${data.split(NEW_LINE).reduce(callback, 1)}`);
    console.log(`Sum: ${sum}`);
});

callback = (accumulator, line) => {
    console.log(`X [${accumulator}]`);
    const splittedLine = line.trim().split(SPACE);
    // console.log(`Signal: [${splittedLine[0]}:${splittedLine[0] != NOOP ? splittedLine[1] : 0}]`);
    // console.log(`Cycles: ${cycles}`);
    for(let i = 0; i < (splittedLine[0] == NOOP ? 1 : 2); ++i) {
        cycles++;
        // console.log(`Cycles incrementation to ${cycles}`);
        if(THRESHOLDS.includes(cycles) && splittedLine[0] != NOOP) {
            console.log(`Threshold reached:  ${cycles}`);
            sum += accumulator * cycles;
            console.log(`Factor added:  ${accumulator * cycles} ([X:${accumulator}]*[T:${cycles}])`);
            console.log(`New sum: ${sum}`);
        }
    }
    return accumulator + (splittedLine[0] != NOOP ? parseInt(splittedLine[1]) : 0);
};
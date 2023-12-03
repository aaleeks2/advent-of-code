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
   
    // data.split(NEW_LINE).reduce(callback, 1);
    // console.log(`Sum: ${sum}`);
    render(data);
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
    console.log(`X: ${accumulator}`);
    return accumulator + (splittedLine[0] != NOOP ? parseInt(splittedLine[1]) : 0);
};

// Part 2
render = (data) => {
    let result = ['', '', '', '', '', ''];
    // let signalCounter = 0;
    let accumulator = 0;
    for(let line of data.split(NEW_LINE)) {
        const splittedLine = line.trim().split(SPACE);
        for(let i = 0; i < (splittedLine[0] == NOOP ? 1 : 2); ++i) {
            cycles++;
            console.log(`X: ${accumulator}`);
            let spriteStart = 0;
            let spriteEnd = 0;
            if(accumulator < 1) {
                spriteEnd = spriteStart + 2;
            } else {
                spriteStart = accumulator - 1;
                spriteEnd = accumulator + 1;
            }
            console.log(`Sprite position: [${spriteStart}:${spriteEnd}]`);

            let currentRow;
            if(cycles < 40) {
                currentRow = 0;
            } else if(cycles < 80) {
                currentRow = 1;
            } else if(cycles < 120) {
                currentRow = 2;
            } else if(cycles < 160) {
                currentRow = 3;
            } else if(cycles < 200) {
                currentRow = 4;
            } else {
                currentRow = 5;
            }

            if(accumulator >= spriteStart && accumulator <= spriteEnd) {
                result[currentRow] = result[currentRow].concat('*');
            } else {
                result[currentRow] = result[currentRow].concat('.');
            }
        }
        accumulator += (splittedLine[0] != NOOP ? parseInt(splittedLine[1]) : 0);
    }
    console.log(result.join('\n'));
};
const fs = require('fs');
const IS_TEST = false;
const INPUT = 'input.txt';
const INPUT_TEST = 'test_input.txt';
const ENCODING_UTF_8 = 'utf-8';
const NEW_LINE = '\n';
const SPACE = ' ';
const NOOP = 'noop';
const THRESHOLDS = [20, 60, 100, 140, 180, 220];
const THRESHOLDS_2 = [40, 80, 120, 160, 200];
let cycles = 1;
let sum = 0;

fs.readFile(IS_TEST ? INPUT_TEST : INPUT, ENCODING_UTF_8, (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
   
    data.split(NEW_LINE).reduce(callback, 1);
    console.log(`Sum: ${sum}`);
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
    let signalCounter = 0;
    let accumulator = 1;
    let currentRow = 0;

    for(let line of data.split(NEW_LINE)) {
        const splittedLine = line.trim().split(SPACE);
        const isNoop = splittedLine[0] == NOOP;
        
        for(let i = 0; i < (isNoop ? 1 : 2); ++i) {
            console.log(`## Cycle ${cycles}: START ##`);
            let spriteStart = 0;
            let spriteEnd = 0;
            if(accumulator < 1) {
                spriteEnd = spriteStart + 2;
            } else {
                spriteStart = accumulator - 1;
                spriteEnd = accumulator + 1;
            }

            console.log(`Current CRT position\t${signalCounter}`);
            console.log(`Sprite position:\t[${spriteStart}:${spriteEnd} | X: ${accumulator}]`)

            if(signalCounter >= spriteStart && signalCounter <= spriteEnd) {
                result[currentRow] = result[currentRow].concat('*');
            } else {
                result[currentRow] = result[currentRow].concat('.');
            }
            console.log(`Row updated:\t${result[currentRow]}`);
            if(THRESHOLDS_2.includes(cycles)) {
                currentRow++;
                signalCounter = 0;
            } else {
                signalCounter++;
            }
            console.log(`## Cycle ${cycles}: END ##\n`);
            cycles++;
        }
        console.log(`After cycle ${cycles - 1} added ${!isNoop ? parseInt(splittedLine[1]) : 0}\n`);
        accumulator += (!isNoop ? parseInt(splittedLine[1]) : 0);
    }
    
    console.log('###########\tTHE RESULT\t###########\n');
    console.log(result.join('\n'));
};
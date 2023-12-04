const fs = require("fs");
const IS_TEST = false;
const INPUT = "input.txt";
const TEST_INPUT = "test_input.txt";
const NEW_LINE = '\n';
const PIPE_SYMBOL = ' | ';
const SPACE = ' ';
const EMPTY_STR = '';
const COLON_SPACE = ': ';
const COLON = ':';
const NUMBER_REGEX = /[0-9]+/g;
const WHITESPACE_REGEX = /\s+/g;

fs.readFile(IS_TEST ? TEST_INPUT : INPUT, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`Part 1 result: ${data.split(NEW_LINE).reduce(part1, 0)}`);
    part2(data);
});

// Part 1
part1 = (accumulator, line) => {
    const winning = countWinning(line);
    return accumulator + (winning > 0 ? 2**(winning - 1) : 0);
}

countWinning = (line) => {
    const splittedLine = line.split(PIPE_SYMBOL);
    // console.log(`The line: ${line}`);
    const pickedNumbers = splittedLine[1].split(WHITESPACE_REGEX);
    // console.log(`Elve's numbers type: ${[...pickedNumbers]}`);
    const winningNumbers = splittedLine[0].split(COLON_SPACE)[1].split(WHITESPACE_REGEX);
    // console.log(`Winning numbers type: ${[...winningNumbers]}`);
    // console.log(`Matching: ${pickedNumbers.filter((x) => winningNumbers.includes(x))}`);
    return pickedNumbers.filter((x) => winningNumbers.includes(x)).length;
}

// Part 2 -- to be optimized and fixed
part2 = (data) => {
    const result = [];
    data.split(NEW_LINE).forEach(line => processGame(line, result));
    console.log(`Part 2 result: ${result.length}`);
}

processGame = (line, resultArray) => {
    const game = parseInt(getNumberGame(line));
    const winning = countWinning(line);
    const copies = resultArray.filter(x => x === game).length;
    for(let i = 1; i <= winning; ++i) {
        let temp = copies;
        do {
            resultArray.push(game+i);
            temp--;
        } while(temp >= 0)
        temp = copies;
    }
    resultArray.push(game);
}

getNumberGame = (line) => line.split(WHITESPACE_REGEX)[1].replace(COLON, EMPTY_STR);
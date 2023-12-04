const fs = require("fs");
const IS_TEST = false;
const INPUT = "input.txt";
const TEST_INPUT = "test_input.txt";
const NEW_LINE = '\n';
const PIPE_SYMBOL = ' | ';
const SPACE = ' ';
const EMPTY_STR = '';
const COLON_SPACE = ': ';
const NUMBER_REGEX = /\d+/g;
const WHITESPACE_REGEX = /\s+|\n/g;

fs.readFile(IS_TEST ? TEST_INPUT : INPUT, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`Part 1 result: ${data.split(NEW_LINE).reduce(part1, 0)}`);
    part2(data);
});

// Part 1
const part1 = (accumulator, line) => {
    const winning = countWinning(line);
    return accumulator + (winning > 0 ? 2**(winning - 1) : 0);
}

const countWinning = (line) => {
    const splittedLine = line.split(PIPE_SYMBOL);
    const pickedNumbers = splittedLine[1]
        .split(WHITESPACE_REGEX)
        .filter(x => x !== EMPTY_STR);

    const winningNumbers = splittedLine[0]
        .split(COLON_SPACE)[1]
        .split(WHITESPACE_REGEX)
        .filter(x => x !== EMPTY_STR);
    const res = winningNumbers.filter((x) => pickedNumbers.includes(x));
    return res.length;
}
// Part 2
const part2 = (data) => {
    const result = [];
    data.split(NEW_LINE).forEach(line => processGame(line, result));
    console.log(`Part 2 result: ${result.length}`);
}

const processGame = (line, resultArray) => {
    const game = parseInt(getNumberGame(line));
    resultArray.push(game);

    const winning = countWinning(line);
    const copies = resultArray.filter(x => x === game).length-1;
    for(let i = 1; i <= winning; ++i) {
        let temp = copies;
        do {
            resultArray.push(game+i);
            temp--;
        } while(temp >= 0)
    }
}

const getNumberGame = (line) => line.split(COLON_SPACE)[0].match(NUMBER_REGEX);
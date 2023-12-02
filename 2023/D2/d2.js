const fs = require("fs");
const StringFormatter = require("../../2022/Utility/StringFormatter.js");

const TEMPLATE = "{0}: {1}";
const NEW_LINE = "\n";
const REGEX_NUMBER = /[0-9]+/g;
const SPACE = / /g;
const COLON_SPACE = /: /g;
const R = 'r'
const G = 'g'
const B = 'b'

fs.readFile("input.txt", "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(StringFormatter.formatWith1ArgForPart1(
        TEMPLATE, 
        data.split(NEW_LINE).reduce(callbackFn, 0)
    ));

    console.log(StringFormatter.formatWith1ArgForPart2(
        TEMPLATE, 
        data.split(NEW_LINE).reduce(callbackFn2, 0)
    ));
});

// Part 1
callbackFn = (accumulator, line) => {
    let rMax = -1;
    let gMax = -1;
    let bMax = -1;

    const gameSplit = line.split(": ");
    const gameId = parseInt(gameSplit[0].match(REGEX_NUMBER));
 
    const cubesSplit = gameSplit[1].split(" ");
   
    for(let i = 1; i < cubesSplit.length; i = i + 2) {
        let val = parseInt(cubesSplit[i-1]);
        let color = cubesSplit[i].charAt(0);

        if(color == R && val >= rMax) {
            rMax = val;
        } else if(color == G && val >= gMax) {
            gMax = val;
        } else if(color == B && val >= bMax){
            bMax = val;
        }

        if(rMax > 12 || gMax > 13 || bMax > 14) {
            return accumulator + 0;
        }
    }

    return accumulator + gameId;
}

// Part 2
callbackFn2 = (accumulator, line) => {
    let rMax = -1;
    let gMax = -1;
    let bMax = -1;

    const cubesSplit = line.split(COLON_SPACE)[1].split(SPACE);
   
    for(let i = 1; i < cubesSplit.length; i = i + 2) {
        let val = parseInt(cubesSplit[i-1]);
        let color = cubesSplit[i].charAt(0);

        if(color == R && val >= rMax) {
            rMax = val;
        } else if(color == G && val >= gMax) {
            gMax = val;
        } else if(color == B && val >= bMax){
            bMax = val;
        }
    }
    return accumulator + rMax * gMax * bMax;
}
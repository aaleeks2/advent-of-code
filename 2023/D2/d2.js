const fs = require("fs");
fs.readFile("input.txt", "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(data.split("\n").reduce(callbackFn2, 0));
});

// Part 1
callbackFn = (accumulator, line) => {
    let rMax = -1;
    let gMax = -1;
    let bMax = -1;

    const gameSplit = line.split(": ");
    const gameId = Number(gameSplit[0].match(/[0-9]+/g));
 
    const cubesSplit = gameSplit[1].split(" ");
   
    for(let i = 1; i < cubesSplit.length; i = i + 2) {
        let val = Number(cubesSplit[i-1]);
        let color = cubesSplit[i].charAt(0);

        if(color == 'r') {
            rMax = val >= rMax ? val : rMax;
        } else if(color == 'g') {
            gMax = val >= gMax ? val : gMax;
        } else {
            bMax = val >= bMax ? val : bMax;
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

    const cubesSplit = line.split(": ")[1].split(" ");
   
    for(let i = 1; i < cubesSplit.length; i = i + 2) {
        let val = Number(cubesSplit[i-1]);
        let color = cubesSplit[i].charAt(0);

        if(color == 'r') {
            rMax = val >= rMax ? val : rMax;
        } else if(color == 'g') {
            gMax = val >= gMax ? val : gMax;
        } else {
            bMax = val >= bMax ? val : bMax;
        }
    }
    return accumulator + rMax * gMax * bMax;
}
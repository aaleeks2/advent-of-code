const fs = require("fs");
const INPUT = 'input.txt';
const TEST_INPUT = 'test_input.txt';
const IS_TEST = true;

fs.readFile(!IS_TEST ? TEST_INPUT : INPUT, "utf-8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(part2(data));
});

const part1 = (data) => {
    const lines = data.replace('\r', '').split('\n');
    const seeds = lines.shift().split(': ')[1].split(' ').map(x => parseInt(x));

    lines.shift();
    return findLowestLocation(seeds, lines);
};

const part2 = (data) => { // wont work that way ;D
    const lines = data.replace('\r', '').split('\n');
    const seeds = lines.shift().split(': ')[1].split(' ').map(x => parseInt(x));
    lines.shift();
    const locs = [];
    for(let i = 0; i < seeds.length - 1; i += 2) {
        const seedsBatch = [];
        for(let j = seeds[i]; j < seeds[i] + seeds[i+1]; ++j) {
            seedsBatch.push(seeds[i] + j);
        }

        locs = [...findLowestLocation(seedsBatch, lines)];
    }
    return locs.sort((a, b) => a - b)[0];
}

const findLowestLocation = (seeds, lines) => {
    return seeds.map(seed => {
        let tmp = seed;
        let mapped = false;
        lines.filter(x => x !== '').forEach(line => {
            const splittedLine = line.split(' ');
            if(line.match(/\d/g) !== null && !mapped) {
                const destination = parseInt(splittedLine[0]);
                const source = parseInt(splittedLine[1]);
                const range = parseInt(splittedLine[2]);
                if(tmp >= source && tmp < source + range) {
                    tmp += destination - source;
                    mapped = true;
                }
            } else if(line.match(/[a-z]+/g) !== null) {
                mapped = false;
            }
        });
        return tmp;
    }).sort((a, b) => a - b)[0];
}
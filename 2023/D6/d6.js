const fs = require("fs");
const INPUT = 'input.txt';

fs.readFile(INPUT, "utf-8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const splittedLines = data.split('\n');
  const time = [...splittedLines[0].matchAll(/\d+/g)].map(x => parseInt(x[0]));
  const distance = [...splittedLines[1].matchAll(/\d+/g)].map(x => parseInt(x[0]));

  console.log(`Part 1: ${time.reduce((accumulator, currentValue, index) => {
    let tmp = 0;
    const theDistance = distance[index];

    for(let i = 1; i < currentValue; ++i) {
        if(i * (currentValue - i) > theDistance) {
            tmp++;
        }
    }

    return accumulator * tmp;
  }, 1)}`);

  let part2 = 0;
  const totalTime  = parseInt(time.join(''));
  const totalDistance = parseInt(distance.join(''));
  for(let i = 1; i < totalTime; ++i) {
    if(i * (totalTime - i) > totalDistance) {
        part2++;
    }
}
  console.log(`Part 2: ${part2}`)
});
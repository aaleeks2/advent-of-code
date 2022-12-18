const fs = require("fs");
const DOUBLE_NEW_LINE_CHARACTER = "\n\n";
const NEW_LINE_CHARACTER = "\n";

fs.readFile("calorie_counting_input.txt", "utf-8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const top3calories = getMaxCalories(data);
  console.log(top3calories);
});

function getMaxCalories(inputData) {
  const summedChunks = [];
  const splittedChunks = inputData.split(DOUBLE_NEW_LINE_CHARACTER);
  splittedChunks.forEach((chunk) => {
    const splittedLines = chunk.split(NEW_LINE_CHARACTER);
    let summedUpChunk = 0;
    splittedLines.forEach((line) => {
      summedUpChunk += Number(line);
    });
    summedChunks.push(summedUpChunk);
  });

  summedChunks.sort(compareNumbers);
  const top3sum = summedChunks[0] + summedChunks[1] + summedChunks[2];
  return top3sum;
}

function compareNumbers(a, b) {
  return b - a;
}

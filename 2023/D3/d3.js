const fs = require('fs');
const IS_TEST = false;
const INPUT = 'input.txt';
const INPUT_TEST = 'test_input.txt';
const ENCODING_UTF_8 = 'utf-8';
const NEW_LINE = '\n';
const NUMBER_REGEX = /[0-9]+/g;
const GEAR_REGEX = /\*/g;
const SYMBOL_REGEX = /(?=\D)(?!\.)/g;
const EMPTY_STRING = '';

fs.readFile(IS_TEST ? INPUT_TEST : INPUT, ENCODING_UTF_8, (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    run2(data);
});
  
// Part 1
run = (data) => {
    let sum = 0;
    const dataMatrix = data.split(NEW_LINE).map(x => x.trim());
    dataMatrix.forEach((line, index) => {
        let prevLine = index == 0 ? EMPTY_STRING : dataMatrix[index - 1];
        let nextLine = index == dataMatrix.length - 1 ? EMPTY_STRING : dataMatrix[index + 1];

        while ((match = NUMBER_REGEX.exec(line)) !== null) {
            const startIndex = match.index < 1 
                ? match.index 
                : match.index - 1;
                
            const lastIndex = NUMBER_REGEX.lastIndex == line.length - 1 
                ? NUMBER_REGEX.lastIndex 
                : NUMBER_REGEX.lastIndex + 1;

            console.log(`Found ${match[0]} start=${match.index} end=${NUMBER_REGEX.lastIndex}.`);

            const prevLineSlice = prevLine !== EMPTY_STRING 
                ? prevLine.slice(startIndex, lastIndex) 
                : prevLine;

            const lineSlice = line.slice(startIndex, lastIndex);

            const nextLineSlice = nextLine !== EMPTY_STRING 
                ? nextLine.slice(startIndex, lastIndex) 
                : nextLine;
            
            if(
                prevLineSlice.match(SYMBOL_REGEX)
                || lineSlice.match(SYMBOL_REGEX)
                || nextLineSlice.match(SYMBOL_REGEX)
            ) {
                sum += parseInt(match);
            }
        }
    });

    console.log(sum);
}
  
// Part 2
run2 = (data) => {
    let sum = 0;
    const dataMatrix = data.split(NEW_LINE).map(x => x.trim());
    dataMatrix.forEach((line, index) => {
        while ((match = GEAR_REGEX.exec(line)) !== null) {
            let adjecentNumbers = [];
            const startIndex = match.index == 0 ? 0 : match.index - 1;
            const lastIndex = GEAR_REGEX.lastIndex == line.length -1 ? line.length -1 : GEAR_REGEX.lastIndex;
            
            console.log(`[${index}] Match index: ${match.index} -- Start index: ${startIndex}\tLast index: ${lastIndex}`);
            if(index != 0) {
                findAdjecentNumbers(dataMatrix[index - 1], startIndex, lastIndex, adjecentNumbers);
            }

            findAdjecentNumbers(line, startIndex, lastIndex, adjecentNumbers);

            if(index != dataMatrix.length - 1) {
                findAdjecentNumbers(dataMatrix[index + 1], startIndex, lastIndex, adjecentNumbers);
            }

            console.log(`[${index}] Adjecent numbers: ${adjecentNumbers}`);
            if(adjecentNumbers.length == 2) {
                sum += (adjecentNumbers[0] * adjecentNumbers[1]);
            }
        }
    });

    console.log(sum);
}

function findAdjecentNumbers(line, sIndex, eIndex, numbers) {
    while ((match = NUMBER_REGEX.exec(line)) !== null) {
        const numberStartIndex = match.index - 1 < 0 ? 0 : match.index;
        const numberLastIndex = NUMBER_REGEX.lastIndex + 1 == line.length ? line.length -1 : NUMBER_REGEX.lastIndex -1;

        if(numberLastIndex >= sIndex && numberStartIndex <= eIndex) {
            numbers.push(parseInt(match));
        }
    }
}

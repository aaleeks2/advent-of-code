const calculationServiceHelper = require("./PrioritiesCalculationServiceHelper.js");

function getPrioritiesSum(inputData) {
    const splittedRucksacks = inputData.split(calculationServiceHelper.NEW_LINE);
    let totalSumOfPrios = 0;

    for(let i = 0; i < splittedRucksacks.length; i = i+3) {
        const rucksacks = [splittedRucksacks[i], splittedRucksacks[i+1], splittedRucksacks[i+2]];
        const prioChar = findPrioCharInRucksacks(rucksacks);
        totalSumOfPrios += calculationServiceHelper.countScoreByChar(prioChar);
    }
    return totalSumOfPrios;
}

function findPrioCharInRucksacks(rucksacks) {
    let prioChar;
    let index = 0;

    while(!prioChar) {
        let theChar = rucksacks[0][index];
        if(rucksacksContaintCertainChar(rucksacks[1], rucksacks[2], theChar)) {
            prioChar = theChar;
        }
        index++;
    }
    return prioChar;
}

function rucksacksContaintCertainChar(rucksack1, rucksack2, theChar) {
    return rucksack1.includes(theChar) && rucksack2.includes(theChar);
}

module.exports = { getPrioritiesSum }
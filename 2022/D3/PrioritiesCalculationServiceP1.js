const calculationServiceHelper = require("./PrioritiesCalculationServiceHelper.js");

function getPrioritiesSum(inputData) {
    const splittedRucksacks = inputData.split(calculationServiceHelper.NEW_LINE);
    let totalSumOfPrios = 0;

    splittedRucksacks.forEach(rucksack => {
        const prioChar = findPrioCharInRucksack(rucksack);
        totalSumOfPrios += calculationServiceHelper.countScoreByChar(prioChar);
    });
    return totalSumOfPrios;
}

function findPrioCharInRucksack(rucksack) {
    const firstHalf = rucksack.slice(0, rucksack.length/2);
    const secondHalf = rucksack.slice(rucksack.length/2);
    let prioChar;
    let index = 0;

    while(!prioChar) {
        let theChar = firstHalf[index];
        if(secondHalf.includes(theChar)) {
            prioChar = theChar;
        }
        index++;
    }

    return prioChar;
}

module.exports = { getPrioritiesSum }
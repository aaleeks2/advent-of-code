const Elf = require("./Elf.js");
const NEW_LINE = "\n";
const COMMA = ",";

function getFullyOverlappedRangesCount(inputData) {
    const elvesPairs =  inputData.split(NEW_LINE);
    const result = {
        fullOverlappings: 0,
        overlappings: 0
    }

    elvesPairs.forEach((pair) => {
        const sortedElvesArray = convertRawElvesPairToElvesObjects(pair)
            .sort((a, b) => b.getRange() - a.getRange());

        if(oneSectionIsFullyOverlapped(...sortedElvesArray)) {
            result.fullOverlappings++;
            result.overlappings++;
        } else if(atLeastOneSectionIsOverlapped(...sortedElvesArray)) {
            result.overlappings++;
        }
    });

    return result;
}

function convertRawElvesPairToElvesObjects(elvesPair) {
    const splittedPair = elvesPair.split(COMMA);
    const firstElf = new Elf(splittedPair[0]);
    const secondElf = new Elf(splittedPair[1]);

    return [firstElf, secondElf];
}

function oneSectionIsFullyOverlapped(widerRange, shorterRange) {
    return widerRange.startSection <= shorterRange.startSection
        && widerRange.endSection >= shorterRange.endSection;
}

function atLeastOneSectionIsOverlapped(widerRange, shorterRange) {
    return shorterRange.startSection <= widerRange.startSection && widerRange.startSection <= shorterRange.endSection
        || shorterRange.startSection <= widerRange.endSection && widerRange.endSection <= shorterRange.endSection;
}

module.exports = { getFullyOverlappedRangesCount }
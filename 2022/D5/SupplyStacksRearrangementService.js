const InstructionWrapper = require("./InstructionWrapper");
const NEW_LINE = "\n";

const supplyStack = {
    1: ["Q", "F", "M", "R", "L", "W", "C", "V"],
    2: ["D", "Q", "L"],
    3: ["P", "S", "R", "G", "W", "C", "N", "B"],
    4: ["L", "C", "D", "H", "B", "Q", "G"],
    5: ["V", "G", "L", "F", "Z", "S"],
    6: ["D", "G", "N", "P"],
    7: ["D", "Z", "P", "V", "F", "C", "W"],
    8: ["C", "P", "D", "M", "S"],
    9: ["Z", "N", "W", "T", "V", "M", "P", "C"]
};

function getResultPart1(inputData) {
    const instructions = inputData.split(NEW_LINE);
    let updatedStackPart1 = JSON.parse(JSON.stringify(supplyStack));
    instructions.forEach((instruction) => {
        let newSupplyStackPart1 = new InstructionWrapper(instruction).executeInstructionPart1(updatedStackPart1);
        updatedStackPart1 = newSupplyStackPart1;
    });
    
    return getFinalAnswer(updatedStackPart1);
}

function getResultPart2(inputData) {
    const instructions = inputData.split(NEW_LINE);
    let updatedStackPart2 = JSON.parse(JSON.stringify(supplyStack));
    instructions.forEach((instruction) => {
        let newSupplyStackPart2 = new InstructionWrapper(instruction).executeInstructionPart2(updatedStackPart2);
        updatedStackPart2 = newSupplyStackPart2;
    });

    return getFinalAnswer(updatedStackPart2);
}

function getFinalAnswer(finalStack) {
    let res = "";
    Object.values(finalStack).forEach(row => res += row.pop());
    return res;
}

module.exports = { getResultPart1, getResultPart2 };
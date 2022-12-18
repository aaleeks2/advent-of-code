module.exports = class InstructionWrapper {
    constructor(rawInstruction) {
        const segments = rawInstruction.split(" ");
        this.cratesNumber = Number(segments[1]);
        this.sourceRow = Number(segments[3]);
        this.destinationRow = Number(segments[5]);
    }

    executeInstructionPart1(supplyStack) {
        for(let i = 0; i < this.cratesNumber; i++) {
            let crate = supplyStack[this.sourceRow].pop();
            supplyStack[this.destinationRow].push(crate);
        }

        return supplyStack;
    }

    executeInstructionPart2(supplyStack) {
        const sourceRowCrates = supplyStack[this.sourceRow];
        const cratesToStay = sourceRowCrates.slice(0, sourceRowCrates.length- this.cratesNumber);
        const cratesToMove = sourceRowCrates.slice(sourceRowCrates.length - this.cratesNumber, sourceRowCrates.length);
        
        supplyStack[this.sourceRow] = cratesToStay;
        supplyStack[this.destinationRow].push(...cratesToMove);

        return supplyStack;
    }

    toString() {
        return `Crates number: ${this.cratesNumber}\tSource row: ${this.sourceRow}\tDestination row: ${this.destinationRow}`;
    }
}
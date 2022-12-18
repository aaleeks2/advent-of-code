const DASH = "-";

module.exports = class Elf {
    constructor(sections) {
        const splittedSections = sections.split(DASH);
        this.startSection = Number(splittedSections[0]);
        this.endSection = Number(splittedSections[1]);
    }

    getRange() {
        return (this.endSection - this.startSection) + 1;
    }

    toString() {
        return `Start: ${this.startSection}\t End: ${this.endSection}\t Range: ${this.getRange()}`;
    }
}
const formatString = require("string-format");
const PART_1 = "Pt. 1";
const PART_2 = "Pt. 2";

function format(pattern, arg) {
    return formatString(pattern, arg);
}

function format(pattern, arg1, arg2) {
    return formatString(pattern, arg1, arg2);
}

function format(pattern, arg1, arg2, arg3) {
    return formatString(pattern, arg1, arg2, arg3);
}

function formatWith1ArgForPart1(pattern, arg) {
    return this.format(pattern, PART_1, arg);
}

function formatWith2ArgForPart1(pattern, arg1, arg2) {
    return this.format(pattern, PART_1, arg1, arg2);
}

function formatWith1ArgForPart2(pattern, arg) {
    return this.format(pattern, PART_2, arg);
}

function formatWith2ArgForPart2(pattern, arg1, arg2) {
    return this.format(pattern, PART_2, arg1, arg2);
}

module.exports = { format, formatWith1ArgForPart1, formatWith2ArgForPart1, formatWith1ArgForPart2, formatWith2ArgForPart2 };
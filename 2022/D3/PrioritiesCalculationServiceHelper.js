const LOWER_CASE_CORRECTION = 96;
const UPPER_CASE_CORRECTION = 38;
const NEW_LINE = "\n";

function countScoreByChar(theChar) {
    const applicableCorrection = theChar == theChar.toLowerCase() 
        ? LOWER_CASE_CORRECTION
        : UPPER_CASE_CORRECTION;
    return theChar.charCodeAt(0) - applicableCorrection;
}

module.exports = { countScoreByChar, NEW_LINE };
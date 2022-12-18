function detectMarker(inputData, interval) {
    let currentEnd = interval;
    for(let i = 0; i < inputData.length; i++) {
        const mySet = new Set([...inputData.slice(currentEnd-interval, currentEnd)]);
        if([...mySet].length == interval) return currentEnd;
        currentEnd++;
    }
    return inputData.length;
}

module.exports = { detectMarker };
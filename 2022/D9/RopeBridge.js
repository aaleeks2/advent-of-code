const { dir } = require("console");
const fs = require("fs");
const positions = new Set();

const X_SURFACE = ["L", "R"];
const INCREMENTS = ["U", "R"];

fs.readFile("rope_bridge.txt", "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    let head = {
        x: 0,
        y: 0
    };

    let tail = {
        x: 0,
        y: 0
    };

    const splittedLines = data.split("\n");

    splittedLines.forEach((line) => {
        const splittedLine = line.split(" ");
        const direction = splittedLine[0];
        const distance = Number(splittedLine[1]);
        const newCoordinate = X_SURFACE.includes(direction)
            ? { x: INCREMENTS.includes(direction) ? head.x + distance : head.x - distance, y: head.y}
            : { x: head.x, y: INCREMENTS.includes(direction) ? head.y + distance : head.y - distance};
        head = newCoordinate;

        if(!isAdjecent(head, tail)) {
            fixTailPosition(head, tail);
        }

    });
});

function fixTailPosition(head, tail) {
    
}

function tailIsInDifferentRow(head, tail) {
    return head.x != tail.x && head.y != tail.y;
}

function tailIsAdjecentToHead(head, tail) {
    return Math.abs(head.x - tail.x) <= 1 && Math.abs(head.y - tail.y) <= 1
}

function savePosition(tail) {
    positions.add(String(tail.x) + ":" + String(tail.y));
}
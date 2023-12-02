const { dir } = require("console");
const fs = require("fs");
const positions = new Set();

const X_SURFACE = ["L", "R"];
const RIGHT = 'R';
const UP = 'U';


// Part 1
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
    positions.add('[0-0]')
    splittedLines.forEach((line) => {
        const splittedLine = line.split(" ");
        const direction = splittedLine[0];
        const distance = parseInt(splittedLine[1]);
        const newCoordinate = X_SURFACE.includes(direction)
            ? { x: direction === RIGHT ? head.x + distance : head.x - distance, y: head.y}
            : { x: head.x, y: direction === UP ? head.y + distance : head.y - distance};
        head = newCoordinate;
        
        if(!tailIsAdjecentToHead(head, tail)) {
            fixTailPosition(head, tail);
        }
    });

    console.log(positions.size);
});

function fixTailPosition(head, tail) {
    if(tailIsInDifferentRow(head, tail)) {
        const x_diff = head.x - tail.x;
        const y_diff = head.y - tail.y;

        if(Math.abs(x_diff) == 1) {
            changePosition(
                tail, 
                tail.x + x_diff,
                tail.y + (head.y > tail.y ? 1 : -1)
            );
        } else if(Math.abs(y_diff) == 1) {
            changePosition(
                tail,
                tail.x + (head.x > tail.x ? 1 : -1),
                tail.y + y_diff
            );
        }
    }

    const axis = head.x != tail.x ? 'x' : 'y';
    const distance = axis === 'x' ? head.x - tail.x : head.y - tail.y;
    const shouldGoForward = distance > 0;
    
    for(let i = 0; i < Math.abs(distance) - 1; ++i) {
        if(axis === 'x') {
            changePosition(tail, tail.x + (shouldGoForward ? 1 : -1), tail.y);
        } else {
            changePosition(tail, tail.x, tail.y + (shouldGoForward ? 1 : -1));
        }
    }
}

function tailIsInDifferentRow(head, tail) {
    return head.x != tail.x && head.y != tail.y;
}

function tailIsAdjecentToHead(head, tail) {
    return Math.abs(head.x - tail.x) <= 1 && Math.abs(head.y - tail.y) <= 1;
}

function changePosition(node, x, y) {
    node.x = x;
    node.y = y;
    positions.add(`[${String(node.x)}-${String(node.y)}]`);
}

// Part 2

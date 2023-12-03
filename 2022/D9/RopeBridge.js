const fs = require("fs");
const positions = new Set();

const X_SURFACE = ['L', 'R'];
const RIGHT = 'R';
const UP = 'U';
const ID_HEAD = 'HEAD';
const ID_TAIL = 'TAIL';
const INITIAL_POSITION = '[0:0]';

fs.readFile('rope_bridge.txt', 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    run2(data);
    console.log(positions.size);
});

// Part 1
function run(data) {
    positions.add(INITIAL_POSITION);
    let head = {
        x: 0,
        y: 0
    };

    let tail = {
        x: 0,
        y: 0
    };

    const splittedLines = data.split('\n');
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
}

function fixTailPosition(head, tail) {
    if(tailIsInDifferentRow(head, tail)) {
        const xDiff = head.x - tail.x;
        const yDiff = head.y - tail.y;
        const shouldFixXaxis = Math.abs(xDiff) == 1;

        changePosition(
            tail, 
            shouldFixXaxis
                ? tail.x + xDiff 
                : tail.x + (head.x > tail.x ? 1 : -1),
            shouldFixXaxis
                ? tail.y + (head.y > tail.y ? 1 : -1) 
                : tail.y + yDiff
        );
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

// Part 2
function run2(data) {
    positions.add(INITIAL_POSITION);
    let rope = [
        {id:1, x: 0, y: 0},
        {id:2, x: 0, y: 0},
        {id:3, x: 0, y: 0},
        {id:4, x: 0, y: 0},
        {id:5, x: 0, y: 0},
        {id:6, x: 0, y: 0},
        {id:7, x: 0, y: 0},
        {id:8, x: 0, y: 0},
        {id:ID_TAIL, x: 0, y: 0}
    ];

    let head = {
        id: ID_HEAD,
        x: 0,
        y: 0
    };

    const splittedLines = data.split('\n');
    splittedLines.forEach((line) => {
        const splittedLine = line.split(' ');
        const direction = splittedLine[0];
        const distance = parseInt(splittedLine[1]);
        console.log(`Direction: ${direction}\tDistance: ${distance}`);
        for(let i = 0; i < distance; ++i) {
            const newCoordinate = X_SURFACE.includes(direction)
                ? { 
                    id: ID_HEAD,
                    x: head.x + (direction === RIGHT ? 1 : -1), 
                    y: head.y
                }
                : { 
                    id: ID_HEAD,
                    x: head.x, 
                    y: head.y + (direction === UP ? 1 : - 1)
                };
            head = newCoordinate;
            console.log(`New HEAD position: [${head.x}:${head.y}]`);
            for(let j = 0; j < rope.length; ++j) {
                fixTailPosition2(j == 0 ? head : rope[j-1], rope[j]);
            }
        }
    });
}

function fixTailPosition2(head, tail) {
    if(tailIsAdjecentToHead(head, tail)) {
        console.log(`Head-node ID: ${head.id} [${head.x}:${head.y}] is adjecent to tail-node ID: ${tail.id} [${tail.x}:${tail.y}]`);
        return;
    }

    const xDiff = head.x - tail.x;
    const yDiff = head.y - tail.y;
    if(tailIsInDifferentRow(head, tail)) {
        console.log(`Tail-node ID: ${tail.id} [${tail.x}:${tail.y}] is diagonaly moving to head-node ID: ${head.id} [${head.x}:${head.y}]`);
        const shouldFixXaxis = Math.abs(xDiff) == 1;
        changePosition2(
            tail, 
            shouldFixXaxis
                ? tail.x + (xDiff > 0 ? 1 : -1)
                : tail.x + (head.x > tail.x ? 1 : -1),
            shouldFixXaxis
                ? tail.y + (head.y > tail.y ? 1 : -1) 
                : tail.y + (yDiff > 0 ? 1 : -1)
        );
    } else {
        console.log(`Tail-node ID: ${tail.id} [${tail.x}:${tail.y}] is moving in line to head-node ID: ${head.id} [${head.x}:${head.y}]`);
        changePosition2(
            tail, 
            tail.x + (xDiff == 0 ? 0: (xDiff > 0 ? 1 : -1)), 
            tail.y + (yDiff == 0 ? 0 :(yDiff > 0 ? 1 : -1))
        );
    }
    console.log(`Tail-node ID: ${tail.id} position fixed to [${tail.x}:${tail.y}]`);
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
    positions.add(`[${node.x}:${node.y}]`);
}

function changePosition2(node, x, y) {
    node.x = x;
    node.y = y;
    if(node.id == ID_TAIL) {
        positions.add(`[${node.x}:${node.y}]`);
        console.log(`TAIL positions: ${[...positions]}`);
    }
}

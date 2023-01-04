const fs = require("fs");
const treeRows = {};
const scores = [];

fs.readFile("treetop_tree_house.txt", "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const splittedLines = data.split("\n");
    let index = 0;
    splittedLines.forEach(line => {
        line = line.replace("\r", "");
        const nums = line.split("");
        nums.forEach(num => {
            if(treeRows[index] == undefined) {
                treeRows[index] = [];
            }

            treeRows[index].push(Number(num));
        })
        ++index;
    });

    for(const [row, trees] of Object.entries(treeRows)) {
        for(let treeIndex = 0; treeIndex < trees.length; treeIndex++) {
            if(treeIndex == 0 || treeIndex == 98 || row == 0 || row == 98) {
                continue;
            }

            scores.push(countScore(treeIndex, row, trees[treeIndex]));
        }
    }
    scores.sort((a, b) => b - a);
    console.log(scores[0]);
});

function countScore(treeIndex, row, theTree) {
    const above = countVisibleTreesFromAbove(treeIndex, row, theTree);
    const underneath = countVisibleTreesUnderneath(treeIndex, row, theTree);
    const sides = multiplyVisibleTreesFromSides(treeIndex, row, theTree);

    return above * underneath * sides;
}

function countVisibleTreesFromAbove(treeIndex, row, theTree) {
    let allTreesAbove = [];
    for(let i = 0; i < row; i++) {
        allTreesAbove.push(treeRows[i][treeIndex]);
    }
    allTreesAbove = allTreesAbove.reverse();

    return calculateLowerTrees(allTreesAbove, theTree);
}

function countVisibleTreesUnderneath(treeIndex, row, theTree) {
    const allTreesBeneath = [];
    for(let i = ++row; i < 99; i++) {
        allTreesBeneath.push(treeRows[i][treeIndex]);
    }

    return calculateLowerTrees(allTreesBeneath, theTree);
}

function multiplyVisibleTreesFromSides(treeIndex, row, theTree) {
    const theRow = treeRows[row];
    let leftSide = theRow.slice(0, treeIndex);
    const rightSide = theRow.slice(++treeIndex, 99);
    leftSide = leftSide.reverse();
    return calculateLowerTrees(leftSide, theTree) * calculateLowerTrees(rightSide, theTree);
}

function calculateLowerTrees(trees, theTree) {
    let counter = 0;

    for(let i = 0; i < trees.length; i++) {
        counter++;
        if(trees[i] >= theTree) break;
    }
    return counter;
}
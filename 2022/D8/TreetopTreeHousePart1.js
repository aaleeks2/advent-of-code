const fs = require("fs");
const treeRows = {};

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

    let visibleTreesCount = 0;
    for(const [row, trees] of Object.entries(treeRows)) {
        for(let treeIndex = 0; treeIndex < trees.length; treeIndex++) {
            if(treeIndex == 0 || treeIndex == 98 || row == 0 || row == 98) {
                visibleTreesCount++;
                continue;
            }

            if(treeIsVisible(treeIndex, row, trees[treeIndex])) {
                visibleTreesCount++;
            }
        }
    }

    console.log(visibleTreesCount);
});

function treeIsVisible(treeIndex, row, theTree) {
    return allAboveAreShorter(treeIndex, row, theTree) 
        || allBeneathAreShorter(treeIndex, row, theTree) 
        || allToTheLefOrRightAreShorter(treeIndex, row, theTree);
}

function allAboveAreShorter(treeIndex, row, theTree) {
    const allTreesAbove = [];
    for(let i = 0; i < row; i++) {
        allTreesAbove.push(treeRows[i][treeIndex]);
    }

    allTreesAbove.sort((a, b) => b - a);

    return theTree > allTreesAbove[0];
}

function allBeneathAreShorter(treeIndex, row, theTree) {
    const allTreesBeneath = [];
    for(let i = ++row; i < 99; i++) {
        allTreesBeneath.push(treeRows[i][treeIndex]);
    }

    allTreesBeneath.sort((a, b) => b - a);

    return theTree > allTreesBeneath[0];
}

function allToTheLefOrRightAreShorter(treeIndex, row, theTree) {
    const theRow = treeRows[row];
    const leftSide = theRow.slice(0, treeIndex);
    const rightSide = theRow.slice(++treeIndex, 99);

    leftSide.sort((a, b) => b - a);
    rightSide.sort((a, b) => b - a);

    return theTree > leftSide[0] || theTree > rightSide[0];
}
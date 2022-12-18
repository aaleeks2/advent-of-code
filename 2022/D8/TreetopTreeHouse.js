const fs = require("fs");

fs.readFile("treetop_tree_house.txt", "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const splittedLines = data.split("\n");
    const treeRows = {};
    let index = 0;
    splittedLines.forEach(line => {
        treeRows[index] = line;
        ++index;
    });
    let visibleTreesCount = 0;
    for(const [key, value] of Object.entries(treeRows)) {
        console.log(key, value);
    }
    // console.log(visibleTreesCount);
});
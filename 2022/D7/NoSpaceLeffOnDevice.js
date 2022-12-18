const fs = require("fs");

const TOTAL_DISK_SPACE = 70000000;
const NEEDED_UNUSED_SPACE = 30000000;

fs.readFile("no_space_left_on_device.txt", "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const sizes = {};
    const path = [];

    data.split("\n").forEach(line => {
        const splittedLine = line.split(" ");
        if(splittedLine[1] === "cd") {
            if(splittedLine[2] == "..") {
                path.pop();
            } else {
                path.push(splittedLine[2]);
            }
        } else if(splittedLine[1] == "ls" || splittedLine[0] == "dir") {

        } else {
            let size = Number(splittedLine[0]);
            let tempPath = "";

            for(let i = 0; i < path.length; i++) {
                tempPath = tempPath.concat("/", path[i]);
                if(sizes[tempPath] == undefined) {
                    sizes[tempPath] = 0;
                }
                sizes[tempPath] += size;
            }
        }
    });

    let ans = 0;
    Object.values(sizes)
        .filter(dir => dir <= 100000)
        .forEach(entry => ans += Number(entry));

    const currentUnusedSpace = TOTAL_DISK_SPACE - sizes["//"];
    const neededSpace = NEEDED_UNUSED_SPACE - currentUnusedSpace;

    console.log("Part 1: " + ans);
    console.log("Part 2: " + Object.values(sizes).filter(dir => dir >= neededSpace).sort((a ,b) => a - b)[0]);
});
const fs = require("fs");
const StringFormatter = require("../Utility/StringFormatter.js");
const CampCleanupService = require("./CampCleanupService.js")

const PRINT_OUT_PATTERN = "Fully overlapped ranges {0}: {1}";

fs.readFile("camp_cleanup_input.txt", "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    
    const results = CampCleanupService.getFullyOverlappedRangesCount(data);
    console.log(StringFormatter.formatWith1ArgForPart1(PRINT_OUT_PATTERN, results.fullOverlappings));
    console.log(StringFormatter.formatWith1ArgForPart2(PRINT_OUT_PATTERN, results.overlappings));
});
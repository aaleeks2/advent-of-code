const fs = require("fs");
const StringFormatter = require("../Utility/StringFormatter.js");
const MarkerDetectingService = require("./MarkerDetectingService.js");

const PRINT_OUT_PATTERN = "Result for {0}: {1}";
const INTERVAL_PART_1 = 4;
const INTERVAL_PART_2 = 14;

fs.readFile("tuning_trouble_input.txt", "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(StringFormatter.formatWith1ArgForPart1(PRINT_OUT_PATTERN, MarkerDetectingService.detectMarker(data, INTERVAL_PART_1)));
    console.log(StringFormatter.formatWith1ArgForPart2(PRINT_OUT_PATTERN, MarkerDetectingService.detectMarker(data, INTERVAL_PART_2)));
});
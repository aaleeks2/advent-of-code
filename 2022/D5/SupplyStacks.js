const fs = require("fs");
const StringFormatter = require("../Utility/StringFormatter.js");
const SupplyStacksRearrangementService = require("./SupplyStacksRearrangementService.js")

const PRINT_OUT_PATTERN = "Result for {0}: {1}";

fs.readFile("supply_stacks_input.txt", "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(StringFormatter.formatWith1ArgForPart1(
        PRINT_OUT_PATTERN,
        SupplyStacksRearrangementService.getResultPart1(data)
    ));

    console.log(StringFormatter.formatWith1ArgForPart2(
        PRINT_OUT_PATTERN,
        SupplyStacksRearrangementService.getResultPart2(data)
    ));
});
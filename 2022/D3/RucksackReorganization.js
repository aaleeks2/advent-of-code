const fs = require("fs");
const StringFormatter = require("../Utility/StringFormatter.js");
const CalculationServiceP1 = require("./PrioritiesCalculationServiceP1.js");
const CalculationServiceP2 = require("./PrioritiesCalculationServiceP2.js");

const PRINT_OUT_PATTERN = "Priorities sum {0}: {1}";

fs.readFile("rucksack_reorganization_input.txt", "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
  
    console.log(StringFormatter.formatWith1ArgForPart1(
        PRINT_OUT_PATTERN, 
        CalculationServiceP1.getPrioritiesSum(inputData)
    ));
    
    console.log(StringFormatter.formatWith1ArgForPart2(
        PRINT_OUT_PATTERN, 
        CalculationServiceP2.getPrioritiesSum(inputData)
    ));
});
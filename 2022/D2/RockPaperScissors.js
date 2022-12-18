const fs = require("fs");
const format = require("string-format");
const calculationService = require("./PointsCalculationService.js");
const PART_1 = "Pt. 1";
const PART_2 = "Pt. 2";
const TOTAL_SCORE_PRINTOUT_PATTERN = "Total score for {0}: {1}";

fs.readFile("rock_paper_scissors_input.txt", "utf-8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  getTotalScore(data);
});

function getTotalScore(inputData) {
  const splittedInput = inputData.split("\n");

  let totalScoreForPt1 = 0;
  let totalScoreForPt2 = 0;

  splittedInput.forEach((gameDescription) => {
    totalScoreForPt1 += calculationService.POINTS_BY_MATCHUP_PART_1.get(gameDescription);
    totalScoreForPt2 += calculationService.POINTS_BY_MATCHUP_PART_2.get(gameDescription);
  });

  console.log(format(TOTAL_SCORE_PRINTOUT_PATTERN, PART_1, totalScoreForPt1));
  console.log(format(TOTAL_SCORE_PRINTOUT_PATTERN, PART_2, totalScoreForPt2));
}

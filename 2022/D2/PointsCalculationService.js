const constants = require("./RockPaperScissorsConstants.js");

const POINTS_BY_RESULT = new Map([
  [constants.WIN, 6],
  [constants.DRAW, 3],
  [constants.LOSE, 0]
]);

const POINTS_BY_MOVE = new Map([
  [constants.ROCK, 1],
  [constants.PAPER, 2],
  [constants.SCISSORS, 3]
]);

const calculatePoints = (result, myMove) => POINTS_BY_RESULT.get(result) + POINTS_BY_MOVE.get(myMove);

const POINTS_BY_MATCHUP_PART_1 = new Map([
  [`${constants.OPP_ROCK} ${constants.ROCK}`, calculatePoints(constants.DRAW, constants.ROCK)],
  [`${constants.OPP_ROCK} ${constants.PAPER}`, calculatePoints(constants.WIN, constants.PAPER)],
  [`${constants.OPP_ROCK} ${constants.SCISSORS}`, calculatePoints(constants.LOSE, constants.SCISSORS)],
  [`${constants.OPP_PAPER} ${constants.ROCK}`, calculatePoints(constants.LOSE, constants.ROCK)],
  [`${constants.OPP_PAPER} ${constants.PAPER}`, calculatePoints(constants.DRAW, constants.PAPER)],
  [`${constants.OPP_PAPER} ${constants.SCISSORS}`, calculatePoints(constants.WIN, constants.SCISSORS)],
  [`${constants.OPP_SCISSORS} ${constants.ROCK}`, calculatePoints(constants.WIN, constants.ROCK)],
  [`${constants.OPP_SCISSORS} ${constants.PAPER}`, calculatePoints(constants.LOSE, constants.PAPER)],
  [`${constants.OPP_SCISSORS} ${constants.SCISSORS}`, calculatePoints(constants.DRAW, constants.SCISSORS)]
]);

const POINTS_BY_MATCHUP_PART_2 = new Map([
  [`${constants.OPP_ROCK} ${constants.WIN_P2}`, calculatePoints(constants.WIN, constants.PAPER)],
  [`${constants.OPP_ROCK} ${constants.LOSE_P2}`, calculatePoints(constants.LOSE, constants.SCISSORS)],
  [`${constants.OPP_ROCK} ${constants.DRAW_P2}`, calculatePoints(constants.DRAW, constants.ROCK)],
  [`${constants.OPP_PAPER} ${constants.WIN_P2}`, calculatePoints(constants.WIN, constants.SCISSORS)],
  [`${constants.OPP_PAPER} ${constants.LOSE_P2}`, calculatePoints(constants.LOSE, constants.ROCK)],
  [`${constants.OPP_PAPER} ${constants.DRAW_P2}`, calculatePoints(constants.DRAW, constants.PAPER)],
  [`${constants.OPP_SCISSORS} ${constants.WIN_P2}`, calculatePoints(constants.WIN, constants.ROCK)],
  [`${constants.OPP_SCISSORS} ${constants.LOSE_P2}`, calculatePoints(constants.LOSE, constants.PAPER)],
  [`${constants.OPP_SCISSORS} ${constants.DRAW_P2}`, calculatePoints(constants.DRAW, constants.SCISSORS)]
]);

module.exports = { 
  POINTS_BY_MATCHUP_PART_1, 
  POINTS_BY_MATCHUP_PART_2 
};
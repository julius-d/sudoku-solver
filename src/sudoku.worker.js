import BoxCantBeRule from "./finder/numberFound2cantBe/BoxCantBeRule";
import SudokuEvent from "./sudoku/SudokuEvent";
import SudokuPosition from "./sudoku/SudokuPosition";
import HorizontalCantBeRule
  from "./finder/numberFound2cantBe/HorizontalCantBeRule";
import VerticalCantBeRule from "./finder/numberFound2cantBe/VerticalCantBeRule";
import OnePositonCantBeRule
  from "./finder/numberFound2cantBe/OnePositonCantBeRule";
import SudokuEventType from "./sudoku/SudokuEventType";
import OnlyOnePlaceHorizontalLine
  from "./finder/cantBe2NumberFound/OnlyOnePlaceHorizontalLine";
import OnlyOnePlaceVerticalLine
  from "./finder/cantBe2NumberFound/OnlyOnePlaceVerticalLine";
import OnlyOnePlaceBox from "./finder/cantBe2NumberFound/OnlyOnePlaceBox";
import OnePositionFinder from "./finder/cantBe2NumberFound/OnePositionFinder";

let numberFound2cantBeRules = [
  (new BoxCantBeRule()),
  (new HorizontalCantBeRule()),
  (new VerticalCantBeRule()),
  (new OnePositonCantBeRule()),
];

let cantBe2NumberFound = [
  (new OnlyOnePlaceHorizontalLine()),
  (new OnlyOnePlaceVerticalLine()),
  (new OnlyOnePlaceBox()),
  (new OnePositionFinder()),
];

// eslint-disable-next-line no-restricted-globals
addEventListener('message', ({data}) => {

  console.log('worker got message', data);

  let sudokuEvent = new SudokuEvent(
      SudokuEventType.NUMBER_FOUND,
      new SudokuPosition(data.field[0], data.field[1]),
      data.value,
      "USER");

  let cantBeRulesResults = [];

  numberFound2cantBeRules.forEach(
      it => cantBeRulesResults = cantBeRulesResults.concat(it.finderLogic(sudokuEvent)));

  cantBe2NumberFound.forEach(rule => {
    let foundNumbers = rule.finderLogic(cantBeRulesResults);
    console.log("foundNumbers", foundNumbers);
    foundNumbers.forEach(foundNumbers => {
      postMessage(foundNumbers);
    });
  });

  cantBeRulesResults.forEach(it => {
    console.log(it);
    postMessage(it);
  });
});

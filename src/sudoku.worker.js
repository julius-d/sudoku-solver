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
import EventFilter from "./sudoku/EventFilter";

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

let eventFilter = new EventFilter();

// eslint-disable-next-line no-restricted-globals
addEventListener('message', ({data}) => {

  console.log('worker got message', data);

  let sudokuEvent = new SudokuEvent(
      SudokuEventType.NUMBER_FOUND,
      new SudokuPosition(data.field[0], data.field[1]),
      data.value,
      "USER");

  let foundNumbers = [sudokuEvent];
  do {
    let cantBeRulesResults = [];
    for (const rule of numberFound2cantBeRules) {
      for (const foundNumber of foundNumbers) {
        cantBeRulesResults = cantBeRulesResults.concat(
            rule.finderLogic(foundNumber));
      }
    }
    cantBeRulesResults.forEach(it => {
      postMessage(it);
    });

    foundNumbers = [];
    for (const rule of cantBe2NumberFound) {
      foundNumbers = foundNumbers.concat(
          rule.finderLogic(cantBeRulesResults));
    }
    foundNumbers = eventFilter.removeAlreadySeen(foundNumbers);
    foundNumbers.forEach(foundNumbers => {
      postMessage(foundNumbers);
    });

  } while (foundNumbers.length > 0)


});

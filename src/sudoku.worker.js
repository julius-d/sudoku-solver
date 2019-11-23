import BoxCantBeRule from "./finder/numberFound2cantBe/BoxCantBeRule";
import SudokuEvent from "./sudoku/SudokuEvent";
import SudokuPosition from "./sudoku/SudokuPosition";
import HorizontalCantBeRule
  from "./finder/numberFound2cantBe/HorizontalCantBeRule";
import VerticalCantBeRule from "./finder/numberFound2cantBe/VerticalCantBeRule";

let rules = [
  (new BoxCantBeRule()),
  (new HorizontalCantBeRule()),
  (new VerticalCantBeRule())
];

// eslint-disable-next-line no-restricted-globals
addEventListener('message', ({data}) => {

  console.log('worker got message', data);

  let sudokuEvent = new SudokuEvent(
      new SudokuPosition(data.field[0], data.field[1]),
      data.value,
      "USER");

  let results = [];

  rules.forEach(it => results= results.concat(it.finderLogic(sudokuEvent)));

  results.forEach(it => {
    console.log(it);
    postMessage(it);
  });
});

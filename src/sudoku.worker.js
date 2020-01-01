import SudokuEvent from "./sudoku/SudokuEvent";
import SudokuPosition from "./sudoku/SudokuPosition";
import SudokuEventType from "./sudoku/SudokuEventType";
import RuleOrchestration from "./sudoku/RuleOrchestration";

let ruleOrchestration = new RuleOrchestration();

// eslint-disable-next-line no-restricted-globals
addEventListener("message", ({ data }) => {
  console.log("worker got message", data);

  let sudokuEvent = new SudokuEvent(
    SudokuEventType.NUMBER_FOUND,
    new SudokuPosition(data.field[0], data.field[1]),
    data.value,
    "USER"
  );
  ruleOrchestration.handleGivenNumber(sudokuEvent, postMessage);
});

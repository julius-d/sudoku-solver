import SudokuPosition from "./sudoku/SudokuPosition";
import RuleOrchestration from "./sudoku/RuleOrchestration";
import NumberFoundEvent from "./sudoku/NumberFoundEvent";

let ruleOrchestration = new RuleOrchestration();

// eslint-disable-next-line no-restricted-globals
addEventListener("message", ({ data }) => {
  console.log("worker got message", data);

  let sudokuEvent = new NumberFoundEvent(
    SudokuPosition.of(data.field[0], data.field[1]),
    data.value,
    "USER"
  );
  ruleOrchestration.handleGivenNumber(sudokuEvent, postMessage);
});

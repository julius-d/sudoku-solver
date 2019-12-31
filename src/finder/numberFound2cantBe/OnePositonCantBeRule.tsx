import AbstractCantBe from "./AbstractCantBe";
import SudokuEvent from "../../sudoku/SudokuEvent";
import SudokuEventType from "../../sudoku/SudokuEventType";

export default class OnePositonCantBeRule extends AbstractCantBe {
  name = "OnePositonCantBeRule";

  finderLogic(numberFoundEvent: SudokuEvent) {
    const result = [];
    for (let i = 1; i <= 9; i++) {
      if (i !== numberFoundEvent.getNumber()) {
        result.push(
          new SudokuEvent(
            SudokuEventType.CANT_BE,
            numberFoundEvent.getPosition(),
            i,
            this.name
          )
        );
      }
    }
    return result;
  }
}

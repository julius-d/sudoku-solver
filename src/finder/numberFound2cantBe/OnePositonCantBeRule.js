import AbstractCantBe from "./AbstractCantBe";
import SudokuEvent from "../../sudoku/SudokuEvent";
import SudokuEventType from "../../sudoku/SudokuEventType";

export default class OnePositonCantBeRule extends AbstractCantBe {

  name = "OnePositonCantBeRule";

  constructor() {
    super("OnePositonCantBeRule");
  }

  finderLogic(numberFoundEvent) {
    const result = [];
    for (let i = 1; i <= 9; i++) {
      result.push(new SudokuEvent(SudokuEventType.CANT_BE,
          numberFoundEvent.getPosition(), i, this.name));
    }
    return result;
  }

}

import AbstractCantBe from "./AbstractCantBe";
import SudokuBox from "../../sudoku/SudokuBox";
import SudokuEvent from "../../sudoku/SudokuEvent";
import SudokuEventType from "../../sudoku/SudokuEventType";

export default class BoxCantBeRule extends AbstractCantBe {

  constructor() {
    super("BoxCantBeRule");
  }

  finderLogic(numberFoundEvent) {
    const result = [];
    const box = SudokuBox.createByPositon(numberFoundEvent.getPosition());

    for (let position of box.iterator()) {
      result.push(
          new SudokuEvent(SudokuEventType.CANT_BE,
              position, numberFoundEvent.getNumber(), this.ruleName));
    }

    return result;
  }

}

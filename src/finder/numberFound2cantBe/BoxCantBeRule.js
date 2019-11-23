import AbstractCantBe from "./AbstractCantBe";
import SudokuBox from "../../sudoku/SudokuBox";
import SudokuEvent from "../../sudoku/SudokuEvent";

export default class BoxCantBeRule extends AbstractCantBe {

  constructor() {
    super("BoxCantBeRule");
  }

  finderLogic(numberFoundEvent) {
    console.log("HURRA");
    console.log(numberFoundEvent);
    const result = [];
    const box = SudokuBox.createByPositon(numberFoundEvent.getPosition());

    for (let position of box.iterator()) {
      result.push(
          new SudokuEvent(position, numberFoundEvent.getNumber(), this.ruleName));
    }

    return result;
  }

}

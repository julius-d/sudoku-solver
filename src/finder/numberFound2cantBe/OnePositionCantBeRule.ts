import CantBeFoundEvent from "../../sudoku/CantBeFoundEvent";
import NumberFoundEvent from "../../sudoku/NumberFoundEvent";
import NumberFound2CantBe from "./NumberFound2CantBe";
import SudokuNumber from "../../sudoku/SudokuNumber";

export default class OnePositionCantBeRule implements NumberFound2CantBe {
  private readonly name = "OnePositionCantBeRule";

  finderLogic(numberFoundEvent: NumberFoundEvent) {
    const result: CantBeFoundEvent[] = [];
    const numbers: SudokuNumber[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    numbers.forEach((i) => {
      if (i !== numberFoundEvent.getNumber()) {
        result.push(
          new CantBeFoundEvent(numberFoundEvent.getPosition(), i, this.name),
        );
      }
    });
    return result;
  }
}

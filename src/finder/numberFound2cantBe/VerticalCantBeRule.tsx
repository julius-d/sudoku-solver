import SudokuEvent from "../../sudoku/SudokuEvent";
import SudokuPosition from "../../sudoku/SudokuPosition";
import SudokuEventType from "../../sudoku/SudokuEventType";
import NumberFoundEvent from "../../sudoku/NumberFoundEvent";
import NumberFound2CantBe from "./NumberFound2CantBe";

export default class VerticalCantBeRule implements NumberFound2CantBe {
  name = "VerticalCantBeRule";

  finderLogic(numberFoundEvent: NumberFoundEvent) {
    const result = [];

    let yk = numberFoundEvent.getPosition().getYKoordinate();
    for (let xk = 0; xk < 9; xk++) {
      if (xk !== numberFoundEvent.getPosition().getXKoordinate()) {
        result.push(
          new SudokuEvent(
            SudokuEventType.CANT_BE,
            new SudokuPosition(xk, yk),
            numberFoundEvent.getNumber(),
            this.name
          )
        );
      }
    }
    return result;
  }
}

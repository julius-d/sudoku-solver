import CantBeFoundEvent from "../../sudoku/CantBeFoundEvent";
import SudokuPosition from "../../sudoku/SudokuPosition";
import SudokuEventType from "../../sudoku/SudokuEventType";
import NumberFoundEvent from "../../sudoku/NumberFoundEvent";
import NumberFound2CantBe from "./NumberFound2CantBe";

export default class HorizontalCantBeRule implements NumberFound2CantBe {
  name = "HorizontalCantBeRule";

  finderLogic(numberFoundEvent: NumberFoundEvent) {
    const result = [];

    let xk = numberFoundEvent.getPosition().getXKoordinate();
    for (let yk = 0; yk < 9; yk++) {
      if (yk !== numberFoundEvent.getPosition().getYKoordinate()) {
        result.push(
          new CantBeFoundEvent(
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

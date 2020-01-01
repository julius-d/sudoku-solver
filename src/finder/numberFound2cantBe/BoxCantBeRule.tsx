import SudokuBox from "../../sudoku/SudokuBox";
import CantBeFoundEvent from "../../sudoku/CantBeFoundEvent";
import SudokuEventType from "../../sudoku/SudokuEventType";
import NumberFoundEvent from "../../sudoku/NumberFoundEvent";
import NumberFound2CantBe from "./NumberFound2CantBe";

export default class BoxCantBeRule implements NumberFound2CantBe {
  private ruleName = "BoxCantBeRule";

  finderLogic(numberFoundEvent: NumberFoundEvent) {
    const result = [];
    const box = SudokuBox.createByPositon(numberFoundEvent.getPosition());

    //  @ts-ignore
    for (let position of box.allSudokuPositionInThisBox()) {
      if (
        position.getYKoordinate() !==
          numberFoundEvent.getPosition().getYKoordinate() ||
        position.getXKoordinate() !==
          numberFoundEvent.getPosition().getXKoordinate()
      ) {
        result.push(
          new CantBeFoundEvent(
            SudokuEventType.CANT_BE,
            position,
            numberFoundEvent.getNumber(),
            this.ruleName
          )
        );
      }
    }

    return result;
  }
}

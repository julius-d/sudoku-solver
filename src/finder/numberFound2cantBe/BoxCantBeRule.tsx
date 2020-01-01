import SudokuBox from "../../sudoku/SudokuBox";
import CantBeFoundEvent from "../../sudoku/CantBeFoundEvent";
import NumberFoundEvent from "../../sudoku/NumberFoundEvent";
import NumberFound2CantBe from "./NumberFound2CantBe";

export default class BoxCantBeRule implements NumberFound2CantBe {
  private ruleName = "BoxCantBeRule";

  finderLogic(numberFoundEvent: NumberFoundEvent) {
    const result = [];
    const box = SudokuBox.createByPosition(numberFoundEvent.getPosition());

    //  @ts-ignore
    for (let position of box.allSudokuPositionInThisBox()) {
      if (
        position.getYCoordinate() !==
          numberFoundEvent.getPosition().getYCoordinate() ||
        position.getXCoordinate() !==
          numberFoundEvent.getPosition().getXCoordinate()
      ) {
        result.push(
          new CantBeFoundEvent(
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

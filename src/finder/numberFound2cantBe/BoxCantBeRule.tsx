import AbstractCantBe from "./AbstractCantBe";
import SudokuBox from "../../sudoku/SudokuBox";
import SudokuEvent from "../../sudoku/SudokuEvent";
import SudokuEventType from "../../sudoku/SudokuEventType";

export default class BoxCantBeRule extends AbstractCantBe {

  private ruleName = "BoxCantBeRule";

  finderLogic(numberFoundEvent: SudokuEvent) {
    const result = [];
    const box = SudokuBox.createByPositon(numberFoundEvent.getPosition());

    // @ts-ignore
    for (let position of box.allSudokuPositionInThisBox()) {
      if (position.getYKoordinate() !== numberFoundEvent.getPosition().getYKoordinate()
         ||  position.getXKoordinate() !== numberFoundEvent.getPosition().getXKoordinate()) {
        result.push(
            new SudokuEvent(SudokuEventType.CANT_BE,
                position, numberFoundEvent.getNumber(), this.ruleName));
      }
    }

    return result;
  }

}

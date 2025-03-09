import CantBeFoundEvent from "../../sudoku/CantBeFoundEvent";
import SudokuPosition from "../../sudoku/SudokuPosition";
import NumberFoundEvent from "../../sudoku/NumberFoundEvent";
import NumberFound2CantBe from "./NumberFound2CantBe";
import SudokuYCoordinate from "../../sudoku/SudokuYCoordinate";

export default class HorizontalCantBeRule implements NumberFound2CantBe {
  private readonly name = "HorizontalCantBeRule";

  finderLogic(numberFoundEvent: NumberFoundEvent) {
    const result: CantBeFoundEvent[] = [];
    const yCoordinates: SudokuYCoordinate[] = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    let xk = numberFoundEvent.getPosition().getXCoordinate();
    yCoordinates.forEach(yk => {
      if (yk !== numberFoundEvent.getPosition().getYCoordinate()) {
        result.push(
          new CantBeFoundEvent(
            SudokuPosition.of(xk, yk),
            numberFoundEvent.getNumber(),
            this.name
          )
        );
      }
    });

    return result;
  }
}

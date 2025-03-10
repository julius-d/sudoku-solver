import CantBeFoundEvent from "../../sudoku/CantBeFoundEvent";
import SudokuPosition from "../../sudoku/SudokuPosition";
import NumberFoundEvent from "../../sudoku/NumberFoundEvent";
import NumberFound2CantBe from "./NumberFound2CantBe";
import SudokuXCoordinate from "../../sudoku/SudokuXCoordinate";

export default class VerticalCantBeRule implements NumberFound2CantBe {
  private readonly name = "VerticalCantBeRule";

  finderLogic(numberFoundEvent: NumberFoundEvent) {
    const result: CantBeFoundEvent[] = [];
    const xCoordinates: SudokuXCoordinate[] = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    let yk = numberFoundEvent.getPosition().getYCoordinate();
    xCoordinates.forEach((xk) => {
      if (xk !== numberFoundEvent.getPosition().getXCoordinate()) {
        result.push(
          new CantBeFoundEvent(
            SudokuPosition.of(xk, yk),
            numberFoundEvent.getNumber(),
            this.name,
          ),
        );
      }
    });
    return result;
  }
}

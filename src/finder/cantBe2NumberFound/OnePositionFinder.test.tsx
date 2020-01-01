import OnePositionFinder from "./OnePositionFinder";
import CantBeFoundEvent from "../../sudoku/CantBeFoundEvent";
import SudokuEventType from "../../sudoku/SudokuEventType";
import SudokuPosition from "../../sudoku/SudokuPosition";
import NumberFoundEvent from "../../sudoku/NumberFoundEvent";

describe("OnePositionFinder", () => {
  it("finds", () => {
    const onePositionFinder = new OnePositionFinder();
    let numberFoundEvents: Array<NumberFoundEvent> = onePositionFinder.finderLogic(
      [
        new CantBeFoundEvent(
          SudokuEventType.CANT_BE,
          new SudokuPosition(2, 3),
          1,
          ""
        ),
        new CantBeFoundEvent(
          SudokuEventType.CANT_BE,
          new SudokuPosition(2, 3),
          2,
          ""
        ),
        new CantBeFoundEvent(
          SudokuEventType.CANT_BE,
          new SudokuPosition(2, 3),
          3,
          ""
        ),
        new CantBeFoundEvent(
          SudokuEventType.CANT_BE,
          new SudokuPosition(2, 3),
          4,
          ""
        ),
        new CantBeFoundEvent(
          SudokuEventType.CANT_BE,
          new SudokuPosition(2, 3),
          5,
          ""
        ),
        new CantBeFoundEvent(
          SudokuEventType.CANT_BE,
          new SudokuPosition(2, 3),
          6,
          ""
        ),
        new CantBeFoundEvent(
          SudokuEventType.CANT_BE,
          new SudokuPosition(2, 3),
          7,
          ""
        ),
        new CantBeFoundEvent(
          SudokuEventType.CANT_BE,
          new SudokuPosition(2, 3),
          8,
          ""
        )
      ]
    );

    expect(numberFoundEvents.length).toBe(1);
    expect(numberFoundEvents[0].getNumber()).toBe(9);
    expect(numberFoundEvents[0].getPosition().getXKoordinate()).toBe(2);
    expect(numberFoundEvents[0].getPosition().getYKoordinate()).toBe(3);
  });
});

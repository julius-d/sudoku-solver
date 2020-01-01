import CantBeFoundEvent from "../../sudoku/CantBeFoundEvent";
import SudokuEventType from "../../sudoku/SudokuEventType";
import SudokuPosition from "../../sudoku/SudokuPosition";
import OnlyOnePlaceVerticalLine from "./OnlyOnePlaceVerticalLine";
import NumberFoundEvent from "../../sudoku/NumberFoundEvent";

describe("OnlyOnePlaceVerticalLine", () => {
  function cantBeNumber1AtPostion(xKoordinate: number, yKoordinate: number) {
    return new CantBeFoundEvent(
      SudokuEventType.CANT_BE,
      new SudokuPosition(xKoordinate, yKoordinate),
      1,
      ""
    );
  }

  it("finds the number", () => {
    let onlyOnePlaceHorizontalLine = new OnlyOnePlaceVerticalLine();
    let numberFoundEvents: NumberFoundEvent[] = onlyOnePlaceHorizontalLine.finderLogic(
      [
        cantBeNumber1AtPostion(0, 1),
        cantBeNumber1AtPostion(1, 1),
        cantBeNumber1AtPostion(2, 1),
        cantBeNumber1AtPostion(3, 1),
        cantBeNumber1AtPostion(4, 1),
        cantBeNumber1AtPostion(5, 1),
        cantBeNumber1AtPostion(6, 1),
        cantBeNumber1AtPostion(7, 1)
      ]
    );

    expect(numberFoundEvents.length).toBe(1);
    expect(numberFoundEvents[0].getNumber()).toBe(1);
    expect(numberFoundEvents[0].getPosition().getXKoordinate()).toBe(8);
    expect(numberFoundEvents[0].getPosition().getYKoordinate()).toBe(1);
  });
});

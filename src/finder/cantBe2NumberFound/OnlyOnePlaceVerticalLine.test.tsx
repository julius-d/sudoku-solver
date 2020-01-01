import CantBeFoundEvent from "../../sudoku/CantBeFoundEvent";
import SudokuPosition from "../../sudoku/SudokuPosition";
import OnlyOnePlaceVerticalLine from "./OnlyOnePlaceVerticalLine";
import NumberFoundEvent from "../../sudoku/NumberFoundEvent";

describe("OnlyOnePlaceVerticalLine", () => {
  function cantBeNumber1AtPosition(xKoordinate: number, yKoordinate: number) {
    return new CantBeFoundEvent(
      new SudokuPosition(xKoordinate, yKoordinate),
      1,
      ""
    );
  }

  it("finds the number", () => {
    let onlyOnePlaceHorizontalLine = new OnlyOnePlaceVerticalLine();
    let numberFoundEvents: NumberFoundEvent[] = onlyOnePlaceHorizontalLine.finderLogic(
      [
        cantBeNumber1AtPosition(0, 1),
        cantBeNumber1AtPosition(1, 1),
        cantBeNumber1AtPosition(2, 1),
        cantBeNumber1AtPosition(3, 1),
        cantBeNumber1AtPosition(4, 1),
        cantBeNumber1AtPosition(5, 1),
        cantBeNumber1AtPosition(6, 1),
        cantBeNumber1AtPosition(7, 1)
      ]
    );

    expect(numberFoundEvents.length).toBe(1);
    expect(numberFoundEvents[0].getNumber()).toBe(1);
    expect(numberFoundEvents[0].getPosition().getXKoordinate()).toBe(8);
    expect(numberFoundEvents[0].getPosition().getYKoordinate()).toBe(1);
  });
});

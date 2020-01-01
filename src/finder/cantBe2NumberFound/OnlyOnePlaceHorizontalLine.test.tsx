import OnlyOnePlaceHorizontalLine from "./OnlyOnePlaceHorizontalLine";
import CantBeFoundEvent from "../../sudoku/CantBeFoundEvent";
import SudokuPosition from "../../sudoku/SudokuPosition";
import NumberFoundEvent from "../../sudoku/NumberFoundEvent";

describe("onlyOnePlaceHorizontalLine", () => {
  function cantBeNumber1AtPosition(xCoordinate: number, coordinate2: number) {
    return new CantBeFoundEvent(
      new SudokuPosition(xCoordinate, coordinate2),
      1,
      ""
    );
  }

  it("finds the number", () => {
    let onlyOnePlaceHorizontalLine = new OnlyOnePlaceHorizontalLine();
    let numberFoundEvents: NumberFoundEvent[] = onlyOnePlaceHorizontalLine.finderLogic(
      [
        cantBeNumber1AtPosition(1, 0),
        cantBeNumber1AtPosition(1, 1),
        cantBeNumber1AtPosition(1, 2),
        cantBeNumber1AtPosition(1, 3),
        cantBeNumber1AtPosition(1, 4),
        cantBeNumber1AtPosition(1, 5),
        cantBeNumber1AtPosition(1, 6),
        cantBeNumber1AtPosition(1, 7)
      ]
    );

    expect(numberFoundEvents.length).toBe(1);
    expect(numberFoundEvents[0].getNumber()).toBe(1);
    expect(numberFoundEvents[0].getPosition().getXCoordinate()).toBe(1);
    expect(numberFoundEvents[0].getPosition().getYCoordinate()).toBe(8);
  });

  it("finds no number", () => {
    let onlyOnePlaceHorizontalLine = new OnlyOnePlaceHorizontalLine();
    let numberFoundEvents: NumberFoundEvent[] = onlyOnePlaceHorizontalLine.finderLogic(
      [
        cantBeNumber1AtPosition(1, 1),
        cantBeNumber1AtPosition(1, 2),
        cantBeNumber1AtPosition(1, 3),
        cantBeNumber1AtPosition(1, 4),
        cantBeNumber1AtPosition(1, 5),
        cantBeNumber1AtPosition(1, 6),
        cantBeNumber1AtPosition(1, 7)
      ]
    );

    expect(numberFoundEvents.length).toBe(0);
  });
});

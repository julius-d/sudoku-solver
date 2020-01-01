import OnlyOnePlaceHorizontalLine from "./OnlyOnePlaceHorizontalLine";
import CantBeFoundEvent from "../../sudoku/CantBeFoundEvent";
import SudokuEventType from "../../sudoku/SudokuEventType";
import SudokuPosition from "../../sudoku/SudokuPosition";
import NumberFoundEvent from "../../sudoku/NumberFoundEvent";

describe("onlyOnePlaceHorizontalLine", () => {
  function cantBeNumber1AtPostion(xKoordinate: number, koordinate2: number) {
    return new CantBeFoundEvent(
      SudokuEventType.CANT_BE,
      new SudokuPosition(xKoordinate, koordinate2),
      1,
      ""
    );
  }

  it("finds the number", () => {
    let onlyOnePlaceHorizontalLine = new OnlyOnePlaceHorizontalLine();
    let numberFoundEvents: NumberFoundEvent[] = onlyOnePlaceHorizontalLine.finderLogic(
      [
        cantBeNumber1AtPostion(1, 0),
        cantBeNumber1AtPostion(1, 1),
        cantBeNumber1AtPostion(1, 2),
        cantBeNumber1AtPostion(1, 3),
        cantBeNumber1AtPostion(1, 4),
        cantBeNumber1AtPostion(1, 5),
        cantBeNumber1AtPostion(1, 6),
        cantBeNumber1AtPostion(1, 7)
      ]
    );

    expect(numberFoundEvents.length).toBe(1);
    expect(numberFoundEvents[0].getNumber()).toBe(1);
    expect(numberFoundEvents[0].getPosition().getXKoordinate()).toBe(1);
    expect(numberFoundEvents[0].getPosition().getYKoordinate()).toBe(8);
  });

  it("finds no number", () => {
    let onlyOnePlaceHorizontalLine = new OnlyOnePlaceHorizontalLine();
    let numberFoundEvents: NumberFoundEvent[] = onlyOnePlaceHorizontalLine.finderLogic(
      [
        cantBeNumber1AtPostion(1, 1),
        cantBeNumber1AtPostion(1, 2),
        cantBeNumber1AtPostion(1, 3),
        cantBeNumber1AtPostion(1, 4),
        cantBeNumber1AtPostion(1, 5),
        cantBeNumber1AtPostion(1, 6),
        cantBeNumber1AtPostion(1, 7)
      ]
    );

    expect(numberFoundEvents.length).toBe(0);
  });
});

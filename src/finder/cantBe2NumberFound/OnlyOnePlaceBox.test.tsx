import OnlyOnePlaceBox from "./OnlyOnePlaceBox";
import CantBeFoundEvent from "../../sudoku/CantBeFoundEvent";
import SudokuPosition from "../../sudoku/SudokuPosition";
import NumberFoundEvent from "../../sudoku/NumberFoundEvent";

describe("OnlyOnePlaceBox", () => {
  it("finds", () => {
    function cantBeNumber1AtPosition(xKoordinate: number, koordinate2: number) {
      return new CantBeFoundEvent(
        new SudokuPosition(xKoordinate, koordinate2),
        1,
        ""
      );
    }

    const onlyOnePlaceBox = new OnlyOnePlaceBox();
    let numberFoundEvents: NumberFoundEvent[] = onlyOnePlaceBox.finderLogic([
      cantBeNumber1AtPosition(0, 0),
      cantBeNumber1AtPosition(0, 1),
      cantBeNumber1AtPosition(1, 0),
      cantBeNumber1AtPosition(1, 1),
      cantBeNumber1AtPosition(1, 2),
      cantBeNumber1AtPosition(2, 1),
      cantBeNumber1AtPosition(2, 2),
      cantBeNumber1AtPosition(0, 2)
    ]);

    expect(numberFoundEvents.length).toBe(1);
    expect(numberFoundEvents[0].getNumber()).toBe(1);
    expect(numberFoundEvents[0].getPosition().getXKoordinate()).toBe(2);
    expect(numberFoundEvents[0].getPosition().getYKoordinate()).toBe(0);
  });
});

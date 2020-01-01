import OnlyOnePlaceBox from "./OnlyOnePlaceBox";
import CantBeFoundEvent from "../../sudoku/CantBeFoundEvent";
import SudokuPosition from "../../sudoku/SudokuPosition";
import NumberFoundEvent from "../../sudoku/NumberFoundEvent";

describe("OnlyOnePlaceBox", () => {
  it("finds", () => {
    function cantBeNumber1AtPostion(xKoordinate: number, koordinate2: number) {
      return new CantBeFoundEvent(
        new SudokuPosition(xKoordinate, koordinate2),
        1,
        ""
      );
    }

    const onlyOnePlaceBox = new OnlyOnePlaceBox();
    let numberFoundEvents: NumberFoundEvent[] = onlyOnePlaceBox.finderLogic([
      cantBeNumber1AtPostion(0, 0),
      cantBeNumber1AtPostion(0, 1),
      cantBeNumber1AtPostion(1, 0),
      cantBeNumber1AtPostion(1, 1),
      cantBeNumber1AtPostion(1, 2),
      cantBeNumber1AtPostion(2, 1),
      cantBeNumber1AtPostion(2, 2),
      cantBeNumber1AtPostion(0, 2)
    ]);

    expect(numberFoundEvents.length).toBe(1);
    expect(numberFoundEvents[0].getNumber()).toBe(1);
    expect(numberFoundEvents[0].getPosition().getXKoordinate()).toBe(2);
    expect(numberFoundEvents[0].getPosition().getYKoordinate()).toBe(0);
  });
});

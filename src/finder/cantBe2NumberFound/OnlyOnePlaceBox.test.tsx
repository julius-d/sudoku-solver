import OnlyOnePlaceBox from "./OnlyOnePlaceBox";
import SudokuEvent from "../../sudoku/SudokuEvent";
import SudokuEventType from "../../sudoku/SudokuEventType";
import SudokuPosition from "../../sudoku/SudokuPosition";

describe("OnlyOnePlaceBox", () => {

  it("finds", () => {

    function cantBeNumber1AtPostion(xKoordinate: number, koordinate2: number) {
      return new SudokuEvent(SudokuEventType.CANT_BE, new SudokuPosition(xKoordinate, koordinate2), 1, "");
    }

    const onlyOnePlaceBox = new OnlyOnePlaceBox();
    let sudokuEvents: Array<SudokuEvent> = onlyOnePlaceBox.finderLogic([
          cantBeNumber1AtPostion(0, 0),
          cantBeNumber1AtPostion(0, 1),
          cantBeNumber1AtPostion(1, 0),
          cantBeNumber1AtPostion(1, 1),
          cantBeNumber1AtPostion(1, 2),
          cantBeNumber1AtPostion(2, 1),
          cantBeNumber1AtPostion(2, 2),
          cantBeNumber1AtPostion(0, 2),
        ]
    );

    expect(sudokuEvents.length).toBe(1);
    expect(sudokuEvents[0].getNumber()).toBe(1);
    expect(sudokuEvents[0].getPosition().getXKoordinate()).toBe(2);
    expect(sudokuEvents[0].getPosition().getYKoordinate()).toBe(0);
  });

});

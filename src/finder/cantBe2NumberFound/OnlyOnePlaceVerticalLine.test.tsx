import SudokuEvent from "../../sudoku/SudokuEvent";
import SudokuEventType from "../../sudoku/SudokuEventType";
import SudokuPosition from "../../sudoku/SudokuPosition";
import OnlyOnePlaceVerticalLine from "./OnlyOnePlaceVerticalLine";


describe("OnlyOnePlaceVerticalLine", () => {


  function cantBeNumber1AtPostion(xKoordinate: number, yKoordinate: number) {
    return new SudokuEvent(SudokuEventType.CANT_BE, new SudokuPosition(xKoordinate, yKoordinate), 1, "");
  }

  it('finds the number', () => {

    let onlyOnePlaceHorizontalLine = new OnlyOnePlaceVerticalLine();
    let sudokuEvents: Array<SudokuEvent> = onlyOnePlaceHorizontalLine.finderLogic([
          cantBeNumber1AtPostion(0, 1),
          cantBeNumber1AtPostion(1, 1),
          cantBeNumber1AtPostion(2, 1),
          cantBeNumber1AtPostion(3, 1),
          cantBeNumber1AtPostion(4, 1),
          cantBeNumber1AtPostion(5, 1),
          cantBeNumber1AtPostion(6, 1),
          cantBeNumber1AtPostion(7, 1),
        ]
    );

    expect(sudokuEvents.length).toBe(1);
    expect(sudokuEvents[0].getNumber()).toBe(1);
    expect(sudokuEvents[0].getPosition().getXKoordinate()).toBe(8);
    expect(sudokuEvents[0].getPosition().getYKoordinate()).toBe(1);
  });

});

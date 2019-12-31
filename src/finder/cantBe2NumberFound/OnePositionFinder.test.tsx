import OnePositionFinder from "./OnePositionFinder";
import SudokuEvent from "../../sudoku/SudokuEvent";
import SudokuEventType from "../../sudoku/SudokuEventType";
import SudokuPosition from "../../sudoku/SudokuPosition";

describe("OnePositionFinder", () => {
  it("finds", () => {
    const onePositionFinder = new OnePositionFinder();
    let sudokuEvents: Array<SudokuEvent> = onePositionFinder.finderLogic([
      new SudokuEvent(SudokuEventType.CANT_BE, new SudokuPosition(2, 3), 1, ""),
      new SudokuEvent(SudokuEventType.CANT_BE, new SudokuPosition(2, 3), 2, ""),
      new SudokuEvent(SudokuEventType.CANT_BE, new SudokuPosition(2, 3), 3, ""),
      new SudokuEvent(SudokuEventType.CANT_BE, new SudokuPosition(2, 3), 4, ""),
      new SudokuEvent(SudokuEventType.CANT_BE, new SudokuPosition(2, 3), 5, ""),
      new SudokuEvent(SudokuEventType.CANT_BE, new SudokuPosition(2, 3), 6, ""),
      new SudokuEvent(SudokuEventType.CANT_BE, new SudokuPosition(2, 3), 7, ""),
      new SudokuEvent(SudokuEventType.CANT_BE, new SudokuPosition(2, 3), 8, "")
    ]);

    expect(sudokuEvents.length).toBe(1);
    expect(sudokuEvents[0].getNumber()).toBe(9);
    expect(sudokuEvents[0].getPosition().getXKoordinate()).toBe(2);
    expect(sudokuEvents[0].getPosition().getYKoordinate()).toBe(3);
  });
});

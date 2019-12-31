import SudokuBox from "./SudokuBox";
import SudokuPosition from "./SudokuPosition";

describe("SudokuBox", () => {
  it("crates positions", () => {
    let sudokuBox = SudokuBox.createByPositon(new SudokuPosition(0, 1));
    let allPositionInBox = sudokuBox.allSudokuPositionInThisBox();

    expect(allPositionInBox.length).toBe(9);
    expect(
      allPositionInBox.map(pos => [pos.getXKoordinate(), pos.getYKoordinate()])
    ).toEqual([
      [0, 0],
      [1, 0],
      [2, 0],
      [0, 1],
      [1, 1],
      [2, 1],
      [0, 2],
      [1, 2],
      [2, 2]
    ]);
  });
});

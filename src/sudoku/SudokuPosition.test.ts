import SudokuPosition from "./SudokuPosition";
import SudokuXCoordinate from "./SudokuXCoordinate";
import SudokuYCoordinate from "./SudokuYCoordinate";


describe("SudokuPosition", () => {

  it("equals itself", () => {
    const sudokuPosition1 = SudokuPosition.of(0, 0);
    const sudokuPosition2 = SudokuPosition.of(0, 0);

    expect([sudokuPosition1].indexOf(sudokuPosition2)).toBeGreaterThan(-1);
    expect(sudokuPosition1 == sudokuPosition2).toBe(true);
    expect(sudokuPosition1).toBe(sudokuPosition2);
  });

  it("has getter for coordinates", () => {
    const sudokuPosition = SudokuPosition.of(0, 8);

    expect(sudokuPosition.getXCoordinate()).toBe(0);
    expect(sudokuPosition.getYCoordinate()).toBe(8);
  });

  it("all 81 instances exist", () => {
    for (let x: SudokuXCoordinate = 0; x < 9; x++) {
      for (let y: SudokuYCoordinate = 0; y < 9; y++) {
        expect(SudokuPosition.of(x, y)).toBeDefined();
      }
    }
  });

});

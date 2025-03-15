import {isValidSudoku} from "./ResultValidator";

describe("ResultValidator", () => {

  it("finds invalid sudoku when number twice in row", () => {
    let sudoku: string[][] =
      [
        ['1', '1', '_', '_', '_', '_', '_', '_', '_'],
        ['_', '_', '_', '_', '_', '_', '_', '_', '_'],
        ['_', '_', '_', '_', '_', '_', '_', '_', '_'],

        ['_', '_', '_', '_', '_', '_', '_', '_', '_'],
        ['_', '_', '_', '_', '_', '_', '_', '_', '_'],
        ['_', '_', '_', '_', '_', '_', '_', '_', '_'],

        ['_', '_', '_', '_', '_', '_', '_', '_', '_'],
        ['_', '_', '_', '_', '_', '_', '_', '_', '_'],
        ['_', '_', '_', '_', '_', '_', '_', '_', '_'],
      ]

    const isValid = isValidSudoku(sudoku);
    expect(isValid).toBe(false);
  });
});

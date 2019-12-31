import SudokuEvent from "../../sudoku/SudokuEvent";
import SudokuEventType from "../../sudoku/SudokuEventType";
import SudokuPosition from "../../sudoku/SudokuPosition";
import BoxCantBeRule from "./BoxCantBeRule";

describe("BoxCantBeRule", () => {
  let rule = new BoxCantBeRule();

  it("sends 8", () => {
    let results = rule.finderLogic(
      new SudokuEvent(SudokuEventType.CANT_BE, new SudokuPosition(1, 2), 3, "")
    );
    expect(results.length).toBe(8);
  });
});

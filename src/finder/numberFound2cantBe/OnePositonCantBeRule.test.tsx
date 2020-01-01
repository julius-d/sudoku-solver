import OnePositonCantBeRule from "./OnePositonCantBeRule";
import SudokuPosition from "../../sudoku/SudokuPosition";
import NumberFoundEvent from "../../sudoku/NumberFoundEvent";

describe("OnePositonCantBeRule", () => {
  let onePositonCantBeRule = new OnePositonCantBeRule();

  it("sends 8", () => {
    let results = onePositonCantBeRule.finderLogic(
      new NumberFoundEvent(new SudokuPosition(1, 2), 3, "")
    );
    expect(results.length).toBe(8);
  });
});

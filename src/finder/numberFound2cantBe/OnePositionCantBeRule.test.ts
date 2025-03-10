import OnePositionCantBeRule from "./OnePositionCantBeRule";
import SudokuPosition from "../../sudoku/SudokuPosition";
import NumberFoundEvent from "../../sudoku/NumberFoundEvent";

describe("OnePositionCantBeRule", () => {
  let onePositionCantBeRule = new OnePositionCantBeRule();

  it("sends 8", () => {
    let results = onePositionCantBeRule.finderLogic(
      new NumberFoundEvent(SudokuPosition.of(1, 2), 3, ""),
    );
    expect(results.length).toBe(8);
  });
});

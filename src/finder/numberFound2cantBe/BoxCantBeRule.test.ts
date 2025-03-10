import SudokuPosition from "../../sudoku/SudokuPosition";
import BoxCantBeRule from "./BoxCantBeRule";
import NumberFoundEvent from "../../sudoku/NumberFoundEvent";

describe("BoxCantBeRule", () => {
  let rule = new BoxCantBeRule();

  it("sends 8", () => {
    let results = rule.finderLogic(
      new NumberFoundEvent(SudokuPosition.of(1, 2), 3, ""),
    );
    expect(results.length).toBe(8);
  });
});

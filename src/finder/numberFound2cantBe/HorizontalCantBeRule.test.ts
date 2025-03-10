import SudokuPosition from "../../sudoku/SudokuPosition";
import HorizontalCantBeRule from "./HorizontalCantBeRule";
import NumberFoundEvent from "../../sudoku/NumberFoundEvent";

describe("HorizontalCantBeRule", () => {
  let rule = new HorizontalCantBeRule();

  it("sends 8", () => {
    let results = rule.finderLogic(
      new NumberFoundEvent(SudokuPosition.of(1, 2), 3, ""),
    );
    expect(results.length).toBe(8);
  });
});

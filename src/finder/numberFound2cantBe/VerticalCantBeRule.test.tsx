import SudokuPosition from "../../sudoku/SudokuPosition";
import VerticalCantBeRule from "./VerticalCantBeRule";
import NumberFoundEvent from "../../sudoku/NumberFoundEvent";

describe("VerticalCantBeRule", () => {
  let rule = new VerticalCantBeRule();

  it("sends 8", () => {
    let results = rule.finderLogic(
      new NumberFoundEvent(SudokuPosition.of(1, 2), 3, "")
    );
    expect(results.length).toBe(8);
  });
});

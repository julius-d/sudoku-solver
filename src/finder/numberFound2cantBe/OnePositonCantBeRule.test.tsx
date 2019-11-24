import OnePositonCantBeRule from "./OnePositonCantBeRule";
import SudokuEvent from "../../sudoku/SudokuEvent";
import SudokuEventType from "../../sudoku/SudokuEventType";
import SudokuPosition from "../../sudoku/SudokuPosition";

describe("OnePositonCantBeRule", () => {

  let onePositonCantBeRule = new OnePositonCantBeRule();

  it("sends 8", () => {
    let results = onePositonCantBeRule.finderLogic(
      new SudokuEvent(SudokuEventType.CANT_BE, new SudokuPosition(1, 2), 3, "")
    );
    expect(results.length).toBe(8);
  });

});

import CantBeFoundEvent from "../../sudoku/CantBeFoundEvent";
import SudokuPosition from "../../sudoku/SudokuPosition";
import PairBasedExcluderInVerticalLine from "./PairBasedExcluderInVerticalLine";
import NumberFoundEvent from "../../sudoku/NumberFoundEvent";
import SudokuXCoordinate from "../../sudoku/SudokuXCoordinate";
import SudokuYCoordinate from "../../sudoku/SudokuYCoordinate";
import SudokuNumber from "../../sudoku/SudokuNumber";

describe("PairBasedExcluderInVerticalLine", () => {
  function numberNotPossible(
    num: SudokuNumber, position :SudokuPosition
  ) {
    return new CantBeFoundEvent(
     position,
      num,
      ""
    );
  }

  function pos(x:SudokuXCoordinate , y : SudokuYCoordinate) {
    return new SudokuPosition(x,y)
  }

  it("finds exclusions", () => {
    let pairBasedExcluderInVerticalLine = new PairBasedExcluderInVerticalLine();
    let cantBeFoundEvent: CantBeFoundEvent[] = pairBasedExcluderInVerticalLine.finderLogic(
      [
        numberNotPossible(1, pos(0,0)),
        numberNotPossible(1, pos(0,1)),
        numberNotPossible(1, pos(0,2)),
        numberNotPossible(1, pos(1,1)),
        numberNotPossible(1, pos(1,2)),
        numberNotPossible(1, pos(2,1)),
        numberNotPossible(1, pos(2,2))
      ]
    );

    expect(cantBeFoundEvent.length).toBe(6);
    expect(cantBeFoundEvent[0].getNumber()).toBe(1);
    expect(cantBeFoundEvent[0].getPosition().getXCoordinate()).toBe(0);
    expect(cantBeFoundEvent[0].getPosition().getYCoordinate()).toBe(3);
  });
});

import CantBeFoundEvent from "../../sudoku/CantBeFoundEvent";
import SudokuPosition from "../../sudoku/SudokuPosition";
import PairBasedExcluderInVerticalLine from "./PairBasedExcluderInVerticalLine";
import SudokuXCoordinate from "../../sudoku/SudokuXCoordinate";
import SudokuYCoordinate from "../../sudoku/SudokuYCoordinate";
import SudokuNumber from "../../sudoku/SudokuNumber";

describe("PairBasedExcluderInVerticalLine", () => {
  function numberNotPossible(
    num: SudokuNumber, position: SudokuPosition
  ) {
    return new CantBeFoundEvent(
      position,
      num,
      ""
    );
  }

  function pos(x: SudokuXCoordinate, y: SudokuYCoordinate) {
    return SudokuPosition.of(x, y)
  }

  it("finds exclusions", () => {
    let pairBasedExcluderInVerticalLine = new PairBasedExcluderInVerticalLine();
    let cantBeFoundEvent: CantBeFoundEvent[] = pairBasedExcluderInVerticalLine.finderLogic(
      [
        numberNotPossible(1, pos(0, 0)),
        numberNotPossible(1, pos(0, 1)),
        numberNotPossible(1, pos(0, 2)),
        numberNotPossible(1, pos(1, 1)),
        numberNotPossible(1, pos(1, 2)),
        numberNotPossible(1, pos(2, 1)),
        numberNotPossible(1, pos(2, 2))
      ]
    );

    expect(cantBeFoundEvent.length).toBe(6);
    expect(cantBeFoundEvent[0].getNumber()).toBe(1);
    const sudokuPositions = cantBeFoundEvent.map(it => it.getPosition());
    expect(sudokuPositions).toContain(SudokuPosition.of(3, 0));
    expect(sudokuPositions).toContain(SudokuPosition.of(4, 0));
    expect(sudokuPositions).toContain(SudokuPosition.of(5, 0));
    expect(sudokuPositions).toContain(SudokuPosition.of(6, 0));
    expect(sudokuPositions).toContain(SudokuPosition.of(7, 0));
    expect(sudokuPositions).toContain(SudokuPosition.of(8, 0));
  });
});

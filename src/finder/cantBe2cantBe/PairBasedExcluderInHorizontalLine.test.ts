import CantBeFoundEvent from "../../sudoku/CantBeFoundEvent";
import SudokuPosition from "../../sudoku/SudokuPosition";
import PairBasedExcluderInHorizontalLine from "./PairBasedExcluderInHorizontalLine";
import SudokuXCoordinate from "../../sudoku/SudokuXCoordinate";
import SudokuYCoordinate from "../../sudoku/SudokuYCoordinate";
import SudokuNumber from "../../sudoku/SudokuNumber";

describe("PairBasedExcluderInHorizontalLine", () => {
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
    let pairBasedExcluderInHorizontalLine = new PairBasedExcluderInHorizontalLine();
    let cantBeFoundEvent: CantBeFoundEvent[] = pairBasedExcluderInHorizontalLine.finderLogic(
      [
        numberNotPossible(1, pos(0, 0)),
        numberNotPossible(1, pos(1, 0)),
        numberNotPossible(1, pos(1, 1)),
        numberNotPossible(1, pos(1, 2)),
        numberNotPossible(1, pos(2, 0)),
        numberNotPossible(1, pos(2, 1)),
        numberNotPossible(1, pos(2, 2))
      ]
    );

    expect(cantBeFoundEvent.length).toBe(6);
    expect(cantBeFoundEvent[0].getNumber()).toBe(1);
    const sudokuPositions = cantBeFoundEvent.map(it => it.getPosition());
    expect(sudokuPositions).toContain(SudokuPosition.of(0, 3));
    expect(sudokuPositions).toContain(SudokuPosition.of(0, 4));
    expect(sudokuPositions).toContain(SudokuPosition.of(0, 5));
    expect(sudokuPositions).toContain(SudokuPosition.of(0, 6));
    expect(sudokuPositions).toContain(SudokuPosition.of(0, 7));
    expect(sudokuPositions).toContain(SudokuPosition.of(0, 8));
  });

  it("handles no exclusions", () => {
    let pairBasedExcluderInHorizontalLine = new PairBasedExcluderInHorizontalLine();
    let cantBeFoundEvent: CantBeFoundEvent[] = pairBasedExcluderInHorizontalLine.finderLogic([]);

    expect(cantBeFoundEvent.length).toBe(0);
  });

  it("handles partial exclusions", () => {
    let pairBasedExcluderInHorizontalLine = new PairBasedExcluderInHorizontalLine();
    let cantBeFoundEvent: CantBeFoundEvent[] = pairBasedExcluderInHorizontalLine.finderLogic(
      [
        numberNotPossible(2, pos(0, 0)),
        numberNotPossible(2, pos(1, 0)),
        numberNotPossible(2, pos(1, 1)),
        numberNotPossible(2, pos(1, 2)),
        numberNotPossible(2, pos(2, 0))
      ]
    );

    expect(cantBeFoundEvent.length).toBe(0);
  });

  it("handles multiple numbers", () => {
    let pairBasedExcluderInHorizontalLine = new PairBasedExcluderInHorizontalLine();
    let cantBeFoundEvent: CantBeFoundEvent[] = pairBasedExcluderInHorizontalLine.finderLogic(
      [
        numberNotPossible(3, pos(0, 0)),
        numberNotPossible(3, pos(1, 0)),
        numberNotPossible(3, pos(1, 1)),
        numberNotPossible(3, pos(1, 2)),
        numberNotPossible(3, pos(2, 0)),
        numberNotPossible(3, pos(2, 1)),
        numberNotPossible(3, pos(2, 2)),
        numberNotPossible(4, pos(0, 0)),
        numberNotPossible(4, pos(1, 0)),
        numberNotPossible(4, pos(1, 1)),
        numberNotPossible(4, pos(1, 2)),
        numberNotPossible(4, pos(2, 0)),
        numberNotPossible(4, pos(2, 1)),
        numberNotPossible(4, pos(2, 2))
      ]
    );

    expect(cantBeFoundEvent.length).toBe(12);
    const sudokuPositions3 = cantBeFoundEvent.filter(it => it.getNumber() === 3).map(it => it.getPosition());
    const sudokuPositions4 = cantBeFoundEvent.filter(it => it.getNumber() === 4).map(it => it.getPosition());
    expect(sudokuPositions3).toContain(SudokuPosition.of(0, 3));
    expect(sudokuPositions3).toContain(SudokuPosition.of(0, 4));
    expect(sudokuPositions3).toContain(SudokuPosition.of(0, 5));
    expect(sudokuPositions3).toContain(SudokuPosition.of(0, 6));
    expect(sudokuPositions3).toContain(SudokuPosition.of(0, 7));
    expect(sudokuPositions3).toContain(SudokuPosition.of(0, 8));
    expect(sudokuPositions4).toContain(SudokuPosition.of(0, 3));
    expect(sudokuPositions4).toContain(SudokuPosition.of(0, 4));
    expect(sudokuPositions4).toContain(SudokuPosition.of(0, 5));
    expect(sudokuPositions4).toContain(SudokuPosition.of(0, 6));
    expect(sudokuPositions4).toContain(SudokuPosition.of(0, 7));
    expect(sudokuPositions4).toContain(SudokuPosition.of(0, 8));
  });
});

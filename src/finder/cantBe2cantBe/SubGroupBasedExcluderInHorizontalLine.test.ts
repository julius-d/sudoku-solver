import CantBeFoundEvent from "../../sudoku/CantBeFoundEvent";
import SudokuPosition from "../../sudoku/SudokuPosition";
import SubGroupBasedExcluderInHorizontalLine from "./SubGroupBasedExcluderInHorizontalLine";
import SudokuXCoordinate from "../../sudoku/SudokuXCoordinate";
import SudokuYCoordinate from "../../sudoku/SudokuYCoordinate";
import SudokuNumber from "../../sudoku/SudokuNumber";

describe("SubGroupBasedExcluderInHorizontalLine", () => {
  function numberNotPossible(num: SudokuNumber, position: SudokuPosition) {
    return new CantBeFoundEvent(position, num, "");
  }

  function pos(x: SudokuXCoordinate, y: SudokuYCoordinate) {
    return SudokuPosition.of(x, y);
  }

  it("finds exclusions for 2 numbers only possible in 2 positions", () => {
    let subGroupBasedExcluderInHorizontalLine = new SubGroupBasedExcluderInHorizontalLine();
    let cantBeFoundEvent: CantBeFoundEvent[] =
      subGroupBasedExcluderInHorizontalLine.finderLogic([
        numberNotPossible(2, pos(0, 0)),
        numberNotPossible(3, pos(0, 0)),
        numberNotPossible(4, pos(0, 0)),
        numberNotPossible(5, pos(0, 0)),
        numberNotPossible(6, pos(0, 0)),
        numberNotPossible(7, pos(0, 0)),
        numberNotPossible(8, pos(0, 0)),

        numberNotPossible(2, pos(0, 1)),
        numberNotPossible(3, pos(0, 1)),
        numberNotPossible(4, pos(0, 1)),
        numberNotPossible(5, pos(0, 1)),
        numberNotPossible(6, pos(0, 1)),
        numberNotPossible(7, pos(0, 1)),
        numberNotPossible(8, pos(0, 1)),

      ]);

    expect(cantBeFoundEvent.length).toBe(14);

    const cantBeFoundEventForNumber1 = cantBeFoundEvent
      .filter((it) => it.getNumber() === 1)
      .map((it) => it.getPosition());
    const cantBeFoundEventForNumber9 = cantBeFoundEvent
      .filter((it) => it.getNumber() === 9)
      .map((it) => it.getPosition());
    expect(cantBeFoundEventForNumber1.length).toBe(7);
    expect(cantBeFoundEventForNumber9.length).toBe(7);

    expect(cantBeFoundEventForNumber1).toContain(SudokuPosition.of(0, 2));
    expect(cantBeFoundEventForNumber1).toContain(SudokuPosition.of(0, 3));
    expect(cantBeFoundEventForNumber1).toContain(SudokuPosition.of(0, 4));
    expect(cantBeFoundEventForNumber1).toContain(SudokuPosition.of(0, 5));
    expect(cantBeFoundEventForNumber1).toContain(SudokuPosition.of(0, 6));
    expect(cantBeFoundEventForNumber1).toContain(SudokuPosition.of(0, 7));
    expect(cantBeFoundEventForNumber1).toContain(SudokuPosition.of(0, 8));

    expect(cantBeFoundEventForNumber9).toContain(SudokuPosition.of(0, 2));
    expect(cantBeFoundEventForNumber9).toContain(SudokuPosition.of(0, 3));
    expect(cantBeFoundEventForNumber9).toContain(SudokuPosition.of(0, 4));
    expect(cantBeFoundEventForNumber9).toContain(SudokuPosition.of(0, 5));
    expect(cantBeFoundEventForNumber9).toContain(SudokuPosition.of(0, 6));
    expect(cantBeFoundEventForNumber9).toContain(SudokuPosition.of(0, 7));
    expect(cantBeFoundEventForNumber9).toContain(SudokuPosition.of(0, 8));

  })
});

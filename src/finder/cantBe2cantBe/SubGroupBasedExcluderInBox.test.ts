import CantBeFoundEvent from "../../sudoku/CantBeFoundEvent";
import SudokuPosition from "../../sudoku/SudokuPosition";
import SudokuXCoordinate from "../../sudoku/SudokuXCoordinate";
import SudokuYCoordinate from "../../sudoku/SudokuYCoordinate";
import SudokuNumber from "../../sudoku/SudokuNumber";
import SubGroupBasedExcluderInBox from "./SubGroupBasedExcluderInBox";

describe("SubGroupBasedExcluderInBox", () => {
  function numberNotPossible(num: SudokuNumber, position: SudokuPosition) {
    return new CantBeFoundEvent(position, num, "");
  }

  function pos(x: SudokuXCoordinate, y: SudokuYCoordinate) {
    return SudokuPosition.of(x, y);
  }

  it("finds exclusions", () => {
    let subGroupBasedExcluderInBox = new SubGroupBasedExcluderInBox();
    let cantBeFoundEvent: CantBeFoundEvent[] =
      subGroupBasedExcluderInBox.finderLogic([
        numberNotPossible(2, pos(0, 0)),
        numberNotPossible(3, pos(0, 0)),
        numberNotPossible(4, pos(0, 0)),
        numberNotPossible(5, pos(0, 0)),
        numberNotPossible(6, pos(0, 0)),
        numberNotPossible(7, pos(0, 0)),
        numberNotPossible(8, pos(0, 0)),

        numberNotPossible(2, pos(2, 1)),
        numberNotPossible(3, pos(2, 1)),
        numberNotPossible(4, pos(2, 1)),
        numberNotPossible(5, pos(2, 1)),
        numberNotPossible(6, pos(2, 1)),
        numberNotPossible(7, pos(2, 1)),
        numberNotPossible(8, pos(2, 1)),

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

    expect(cantBeFoundEventForNumber1).toContain(SudokuPosition.of(0, 1));
    expect(cantBeFoundEventForNumber1).toContain(SudokuPosition.of(0, 2));
    expect(cantBeFoundEventForNumber1).toContain(SudokuPosition.of(1, 0));
    expect(cantBeFoundEventForNumber1).toContain(SudokuPosition.of(1, 1));
    expect(cantBeFoundEventForNumber1).toContain(SudokuPosition.of(1, 2));
    expect(cantBeFoundEventForNumber1).toContain(SudokuPosition.of(2, 0));
    expect(cantBeFoundEventForNumber1).toContain(SudokuPosition.of(2, 2));

    expect(cantBeFoundEventForNumber9).toContain(SudokuPosition.of(0, 1));
    expect(cantBeFoundEventForNumber9).toContain(SudokuPosition.of(0, 2));
    expect(cantBeFoundEventForNumber9).toContain(SudokuPosition.of(1, 0));
    expect(cantBeFoundEventForNumber9).toContain(SudokuPosition.of(1, 1));
    expect(cantBeFoundEventForNumber9).toContain(SudokuPosition.of(1, 2));
    expect(cantBeFoundEventForNumber9).toContain(SudokuPosition.of(2, 0));
    expect(cantBeFoundEventForNumber9).toContain(SudokuPosition.of(2, 2));

  });

  it("return only exclusions for boxes affected of new CantBeFoundEvent", () => {
    let subGroupBasedExcluderInBox = new SubGroupBasedExcluderInBox();
    let cantBeFoundEvent: CantBeFoundEvent[] =
      subGroupBasedExcluderInBox.finderLogic([
        numberNotPossible(2, pos(0, 0)),
        numberNotPossible(3, pos(0, 0)),
        numberNotPossible(4, pos(0, 0)),
        numberNotPossible(5, pos(0, 0)),
        numberNotPossible(6, pos(0, 0)),
        numberNotPossible(7, pos(0, 0)),
        numberNotPossible(8, pos(0, 0)),

        numberNotPossible(2, pos(2, 1)),
        numberNotPossible(3, pos(2, 1)),
        numberNotPossible(4, pos(2, 1)),
        numberNotPossible(5, pos(2, 1)),
        numberNotPossible(6, pos(2, 1)),
        numberNotPossible(7, pos(2, 1)),
        numberNotPossible(8, pos(2, 1)),

      ]);

    expect(cantBeFoundEvent.length).toBe(14);

    const newCantBeFoundEvents = subGroupBasedExcluderInBox.finderLogic([
      numberNotPossible(2, pos(0, 0))]);

    expect(newCantBeFoundEvents.length).toBe(0);
  })


  it("finds no exclusions when no pairs are present", () => {
    let subGroupBasedExcluderInBox = new SubGroupBasedExcluderInBox();
    let cantBeFoundEvent: CantBeFoundEvent[] =
      subGroupBasedExcluderInBox.finderLogic([
        numberNotPossible(2, pos(0, 0)),
        numberNotPossible(3, pos(0, 1)),
        numberNotPossible(4, pos(0, 2)),
        numberNotPossible(5, pos(1, 0)),
        numberNotPossible(6, pos(1, 1)),
        numberNotPossible(7, pos(1, 2)),
        numberNotPossible(8, pos(2, 0)),
        numberNotPossible(9, pos(2, 1)),
      ]);

    expect(cantBeFoundEvent.length).toBe(0);
  });

});

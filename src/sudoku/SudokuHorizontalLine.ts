import SudokuPosition from "./SudokuPosition";
import SudokuXCoordinate from "./SudokuXCoordinate";
import {allSudokuYCoordinates} from "./SudokuYCoordinate";

export default class SudokuHorizontalLine {
  private static allLines: SudokuHorizontalLine[] = [
    new SudokuHorizontalLine(0),
    new SudokuHorizontalLine(1),
    new SudokuHorizontalLine(2),
    new SudokuHorizontalLine(3),
    new SudokuHorizontalLine(4),
    new SudokuHorizontalLine(5),
    new SudokuHorizontalLine(6),
    new SudokuHorizontalLine(7),
    new SudokuHorizontalLine(8),
  ];
  private readonly lineCoordinate: SudokuXCoordinate;

  private constructor(lineCoordinate: SudokuXCoordinate) {
    this.lineCoordinate = lineCoordinate;
  }

  static getAll(): SudokuHorizontalLine[] {
    return SudokuHorizontalLine.allLines;
  }

  allSudokuPositionInThisLine(): SudokuPosition[] {
    return allSudokuYCoordinates().map(y => SudokuPosition.of(this.lineCoordinate, y));
  }

  static createByPosition(position: SudokuPosition): SudokuHorizontalLine {
    return SudokuHorizontalLine.allLines[position.getXCoordinate()]
  }
}

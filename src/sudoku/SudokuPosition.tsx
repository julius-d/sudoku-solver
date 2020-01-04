import SudokuXCoordinate from "./SudokuXCoordinate";
import SudokuYCoordinate from "./SudokuYCoordinate";

export default class SudokuPosition {
  readonly xCoordinate: SudokuXCoordinate;
  readonly yCoordinate: SudokuYCoordinate;

  constructor(xCoordinate: SudokuXCoordinate, yCoordinate: SudokuYCoordinate) {
    this.xCoordinate = xCoordinate;
    this.yCoordinate = yCoordinate;
  }

  getXCoordinate() {
    return this.xCoordinate;
  }

  getYCoordinate() {
    return this.yCoordinate;
  }

  toString() {
    return "Pos: [" + this.xCoordinate + "," + this.yCoordinate + "]";
  }

  valueOf() {
    return "[" + this.xCoordinate + "][" + this.yCoordinate + "]";
  }
}

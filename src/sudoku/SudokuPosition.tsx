export default class SudokuPosition {
  readonly xCoordinate: number;
  readonly yCoordinate: number;

  constructor(xCoordinate: number, yCoordinate: number) {
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

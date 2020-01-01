export default class SudokuPosition {
  readonly xKoordinate: number;
  readonly yKoordinate: number;

  constructor(xKoordinate: number, yKoordinate: number) {
    this.xKoordinate = xKoordinate;
    this.yKoordinate = yKoordinate;
  }

  getXKoordinate() {
    return this.xKoordinate;
  }

  getYKoordinate() {
    return this.yKoordinate;
  }

  toString() {
    return "Pos: [" + this.xKoordinate + "," + this.yKoordinate + "]";
  }

  valueOf() {
    return "[" + this.xKoordinate + "][" + this.yKoordinate + "]";
  }
}

export default class SudokuPosition {
  xKoordinate: number;
  yKoordinate: number;

  constructor(xKoordinate: number, yKoordinate: number) {
    this.xKoordinate = xKoordinate;
    this.yKoordinate = yKoordinate;
  }

  getXKoordinate() {
    return this.xKoordinate;
  }

  setXKoordinate(koordinate: number) {
    this.xKoordinate = koordinate;
  }

  getYKoordinate() {
    return this.yKoordinate;
  }

  setYKoordinate(koordinate: number) {
    this.yKoordinate = koordinate;
  }

  toString() {
    return "Pos: [" + this.xKoordinate + "," + this.yKoordinate + "]";
  }

  valueOf() {
    return "[" + this.xKoordinate + "][" + this.yKoordinate + "]";
  }
}

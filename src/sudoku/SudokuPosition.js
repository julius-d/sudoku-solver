export default class SudokuPosition {
  xKoordinate;
  yKoordinate;

  constructor(koordinate, koordinate2) {
    this.xKoordinate = koordinate;
    this.yKoordinate = koordinate2;
  }

  getXKoordinate() {
    return this.xKoordinate;
  }

  setXKoordinate(koordinate) {
    this.xKoordinate = koordinate;
  }

  getYKoordinate() {
    return this.yKoordinate;
  }

  setYKoordinate(koordinate) {
    this.yKoordinate = koordinate;
  }

  toString() {
    return "Pos: [" + this.xKoordinate + "," + this.yKoordinate + "]";
  }

}

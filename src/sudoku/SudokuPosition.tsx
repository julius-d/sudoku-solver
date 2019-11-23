export default class SudokuPosition {
  xKoordinate :number;
  yKoordinate: number;

  constructor(koordinate: number, koordinate2: number) {
    this.xKoordinate = koordinate;
    this.yKoordinate = koordinate2;
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

}

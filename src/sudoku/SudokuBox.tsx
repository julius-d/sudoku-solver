import SudokuItem from "./SudokuItem";
import SudokuPosition from "./SudokuPosition";

export default class SudokuBox extends SudokuItem {
  private readonly x : number;
  private readonly y : number;

  private static allInstances: SudokuBox[][] = SudokuBox.createAll();

  private constructor(x: number, y: number) {
    super();
    if (x < 0 || y < 0 || x > 2 || y > 2) {
      throw new Error("illegal argument x:"+x+" y: "+y);
    }
    this.x = x;
    this.y = y;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  getAll() {
    return SudokuBox.allInstances;
  }

  private static createAll() {
    const all : SudokuBox[][] = [];
    for (let x = 0; x < 3; x++) {
      all[x] = [];
      for (let y = 0; y < 3; y++) {
        all[x][y] = (new SudokuBox(x, y));
      }
    }
    return all;
  }

  static createByPositon(postion: SudokuPosition) {
    let x = postion.getXKoordinate();
    let y = postion.getYKoordinate();
    x = Math.trunc(x / 3);
    y = Math.trunc(y / 3);
    return this.allInstances[x][y] ;
  }

  static create(x: number, y: number) {
    return this.allInstances[x][y];
  }

  iterator() {
    return new AllIntheBoxIterator(this.x, this.y);
  }

  toString() {
    return "Box: [" + this.x + "," + this.y + "]";
  }

}

class AllIntheBoxIterator {

  x: number;
  y: number;
  _hasNext = true;

  xAdd = 0;
  yAdd = 0;
  stepp = 0;

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this[Symbol.iterator]= function() { return this }
  }

  next() {
    const position = new SudokuPosition(this.x * 3 + this.xAdd,
        this.y * 3 + this.yAdd);
    if (++this.stepp > 9) {
      this._hasNext = false;
    }
    this.xAdd = this.stepp % 3;
    this.yAdd = Math.trunc(this.stepp / 3);
    return { value: position, done: !this._hasNext };
  }


}

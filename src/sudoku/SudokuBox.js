import SudokuItem from "./SudokuItem";
import SudokuPosition from "./SudokuPosition";

export default class SudokuBox extends SudokuItem {
  x;
  y;

  constructor(x, y) {
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
    const set = [];
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        set.push(new SudokuBox(x, y));
      }
    }

    return set;
  }

  static createByPositon(postion) {
    let x = postion.getXKoordinate();
    let y = postion.getYKoordinate();
    x = Math.trunc(x / 3);
    y = Math.trunc(y / 3);
    return new SudokuBox(x, y);
  }

  createItemByPositon(postion) {
    let x = postion.getXKoordinate();
    let y = postion.getYKoordinate();
    x = x / 3;
    y = y / 3;
    let box = new SudokuBox(x, y);
    return box;
  }

  iterator() {
    return new AllIntheBoxIterator(this.x, this.y);
  }

  toString() {
    return "Box: [" + this.x + "," + this.y + "]";
  }
}

class AllIntheBoxIterator {

  x;
  y;
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

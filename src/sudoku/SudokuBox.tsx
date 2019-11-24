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

  allSudokuPositionInThisBox() {
    let xAdd = 0;
    let yAdd = 0;
    let stepp = 0;
    let hasNext = true;

    let result = [];
    while (hasNext) {
      const position = new SudokuPosition(this.x * 3 + xAdd,
          this.y * 3 + yAdd);
      if (++stepp >= 9) {
        hasNext = false;
      }
      xAdd = stepp % 3;
      yAdd = Math.trunc(stepp / 3);
      result.push(position)
    }
    return result;
  }

  toString() {
    return "Box: [" + this.x + "," + this.y + "]";
  }

}

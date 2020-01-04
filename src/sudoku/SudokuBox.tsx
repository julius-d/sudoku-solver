import SudokuPosition from "./SudokuPosition";
import SudokuYCoordinate from "./SudokuYCoordinate";
import SudokuXCoordinate from "./SudokuXCoordinate";

type BoxCoordinate = 0 | 1 | 2;

export default class SudokuBox {
  private readonly x: BoxCoordinate;
  private readonly y: BoxCoordinate;

  private static allInstances: SudokuBox[][] = SudokuBox.createAll();

  private constructor(x: BoxCoordinate, y: BoxCoordinate) {
    if (x < 0 || y < 0 || x > 2 || y > 2) {
      throw new Error("illegal argument x:" + x + " y: " + y);
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
    const allBoxCoordinates: BoxCoordinate[] = [0, 1, 2];
    const all: SudokuBox[][] = [[], [], []];
    allBoxCoordinates.forEach(x => {
      allBoxCoordinates.forEach(y => {
        all[x][y] = new SudokuBox(x, y);
      });
    });
    return all;
  }

  static createByPosition(postion: SudokuPosition) {
    const x = postion.getXCoordinate();
    const y = postion.getYCoordinate();
    const boxXCoordinate = this.boxCoordinateFor(x);
    const boxYCoordinate = this.boxCoordinateFor(y);
    return this.allInstances[boxXCoordinate][boxYCoordinate];
  }

  private static boxCoordinateFor(
    coordinate: SudokuXCoordinate | SudokuYCoordinate
  ) {
    if (coordinate === 0 || coordinate === 1 || coordinate === 2) {
      return 0;
    } else if (coordinate === 3 || coordinate === 4 || coordinate === 5) {
      return 1;
    } else {
      return 2;
    }
  }

  private static sudokuCoordinateFor(
    coordinate: BoxCoordinate
  ): Array<SudokuXCoordinate | SudokuYCoordinate> {
    if (coordinate === 0) {
      return [0, 1, 2];
    } else if (coordinate === 1) {
      return [3, 4, 5];
    } else {
      return [6, 7, 8];
    }
  }

  static create(x: number, y: number) {
    return this.allInstances[x][y];
  }

  allSudokuPositionInThisBox() {
    let result: SudokuPosition[] = [];
    SudokuBox.sudokuCoordinateFor(this.x).forEach(xC => {
      SudokuBox.sudokuCoordinateFor(this.y).forEach(yC => {
        const position = new SudokuPosition(xC, yC);
        result.push(position);
      });
    });
    return result;
  }

  toString() {
    return "Box: [" + this.x + "," + this.y + "]";
  }
}

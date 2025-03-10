import SudokuXCoordinate from "./SudokuXCoordinate";
import SudokuYCoordinate from "./SudokuYCoordinate";

export default class SudokuPosition {
  readonly xCoordinate: SudokuXCoordinate;
  readonly yCoordinate: SudokuYCoordinate;

  private static allInstances: SudokuPosition[][] = SudokuPosition.createAll();

  private static createAll() {
    const allXCoordinates: SudokuXCoordinate[] = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const allYCoordinates: SudokuYCoordinate[] = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const all: SudokuPosition[][] = [[], [], [], [], [], [], [], [], []];
    allXCoordinates.forEach((x) => {
      allYCoordinates.forEach((y) => {
        all[x][y] = new SudokuPosition(x, y);
      });
    });
    return all;
  }

  public static of(
    xCoordinate: SudokuXCoordinate,
    yCoordinate: SudokuYCoordinate,
  ): SudokuPosition {
    return SudokuPosition.allInstances[xCoordinate][yCoordinate];
  }

  private constructor(
    xCoordinate: SudokuXCoordinate,
    yCoordinate: SudokuYCoordinate,
  ) {
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

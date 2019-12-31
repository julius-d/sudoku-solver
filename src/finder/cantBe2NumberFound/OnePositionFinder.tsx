import AbstractFinder from "./AbstractFinder";
import SudokuEvent from "../../sudoku/SudokuEvent";
import SudokuEventType from "../../sudoku/SudokuEventType";

export default class OnePositionFinder extends AbstractFinder {
  notThisNumber: boolean[][][] = OnePositionFinder.createBoolean3dArray();
  name = "OnePositionFinder";

  finderLogic(cantBes: Array<SudokuEvent>) {
    const results = [];
    for (let info of cantBes) {
      const position = info.getPosition();
      const nTNumber = info.getNumber();
      this.notThisNumber[position.getXKoordinate()][position.getYKoordinate()][
        nTNumber - 1
      ] = true;

      let anzFalse = 0;
      let lastFalsePostion = -1;
      for (let i = 0; i < 9; i++) {
        if (
          !this.notThisNumber[position.getXKoordinate()][
            position.getYKoordinate()
          ][i]
        ) {
          anzFalse++;
          lastFalsePostion = i;
        }
      }
      if (anzFalse === 1) {
        results.push(
          new SudokuEvent(
            SudokuEventType.NUMBER_FOUND,
            position,
            lastFalsePostion + 1,
            this.name
          )
        );
      }
    }
    return results;
  }

  private static createBoolean3dArray() {
    const array3d: boolean[][][] = [];

    for (let i = 0; i < 9; i++) {
      array3d[i] = [];
      for (let j = 0; j < 9; j++) {
        array3d[i][j] = [];
        for (let k = 0; k < 9; k++) {
          array3d[i][j][k] = false;
        }
      }
    }

    return array3d;
  }
}

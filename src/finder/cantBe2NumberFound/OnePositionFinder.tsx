import CantBeFoundEvent from "../../sudoku/CantBeFoundEvent";
import CantBe2NumberFound from "./CantBe2NumberFound";
import NumberFoundEvent from "../../sudoku/NumberFoundEvent";
import SudokuNumber from "../../sudoku/SudokuNumber";

export default class OnePositionFinder implements CantBe2NumberFound {
  notThisNumber: boolean[][][] = OnePositionFinder.createBoolean3dArray();
  name = "OnePositionFinder";

  finderLogic(cantBes: CantBeFoundEvent[]) {
    const results: NumberFoundEvent[] = [];
    for (let event of cantBes) {
      const position = event.getPosition();
      const nTNumber = event.getNumber();
      this.notThisNumber[position.getXCoordinate()][position.getYCoordinate()][
        nTNumber
      ] = true;

      let anzFalse = 0;
      let lastFalsePosition: SudokuNumber | null = null;
      const numbers: SudokuNumber[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

      numbers.forEach(i => {
        if (
          !this.notThisNumber[position.getXCoordinate()][
            position.getYCoordinate()
          ][i]
        ) {
          anzFalse++;
          lastFalsePosition = i;
        }
      });
      if (anzFalse === 1 && lastFalsePosition !== null) {
        results.push(
          new NumberFoundEvent(position, lastFalsePosition, this.name)
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

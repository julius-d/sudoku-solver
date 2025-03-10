import SudokuBox from "../../sudoku/SudokuBox";
import SudokuPosition from "../../sudoku/SudokuPosition";
import CantBeFoundEvent from "../../sudoku/CantBeFoundEvent";
import CantBe2NumberFound from "./CantBe2NumberFound";
import NumberFoundEvent from "../../sudoku/NumberFoundEvent";
import SudokuNumber from "../../sudoku/SudokuNumber";

function samePosition(one: SudokuPosition, two: SudokuPosition) {
  return (
    one.getXCoordinate() === two.getXCoordinate() &&
    one.getYCoordinate() === two.getYCoordinate()
  );
}

export default class OnlyOnePlaceBox implements CantBe2NumberFound {
  /**
   * Es wird für jede Box für jede Zahl(1-9) gespeichert, wo sie nicht hin darf.
   */
  private readonly memory: Map<
    SudokuBox,
    Map<SudokuNumber, Array<SudokuPosition>>
  > = OnlyOnePlaceBox.init();
  private readonly name = "OnlyOnePlaceBox";

  private static init() {
    const numbers: SudokuNumber[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const memory = new Map<
      SudokuBox,
      Map<SudokuNumber, Array<SudokuPosition>>
    >();
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        let map1 = new Map<SudokuNumber, Array<SudokuPosition>>();
        numbers.forEach((i) => {
          map1.set(i, []);
        });
        memory.set(SudokuBox.create(x, y), map1);
      }
    }
    return memory;
  }

  finderLogic(cantBes: Array<CantBeFoundEvent>) {
    const results: NumberFoundEvent[] = [];
    for (let info of cantBes) {
      let position = info.getPosition();
      let nTNumber = info.getNumber();
      let box: SudokuBox = SudokuBox.createByPosition(position);

      const notHeres = this.memory.get(box)?.get(nTNumber);
      if (notHeres && !notHeres.find((it) => samePosition(position, it))) {
        notHeres.push(position);
        if (notHeres.length === 8) {
          box.allSudokuPositionInThisBox().forEach((newPos) => {
            if (!notHeres.find((it) => samePosition(newPos, it))) {
              results.push(new NumberFoundEvent(newPos, nTNumber, this.name)); //FIXME
            }
          });
        }
      }
    }
    return results;
  }
}

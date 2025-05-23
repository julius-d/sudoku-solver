import SudokuPosition from "../../sudoku/SudokuPosition";
import CantBeFoundEvent from "../../sudoku/CantBeFoundEvent";
import SudokuNumber from "../../sudoku/SudokuNumber";
import SudokuXCoordinate from "../../sudoku/SudokuXCoordinate";
import SudokuYCoordinate from "../../sudoku/SudokuYCoordinate";
import SudokuBox from "../../sudoku/SudokuBox";
import CantBe2CantBe from "./CantBe2CantBe";
import { getAllPossiblePositions, getXCoordinatesOf } from "./Utils";

function samePosition(one: SudokuPosition, two: SudokuPosition) {
  return (
    one.getXCoordinate() === two.getXCoordinate() &&
    one.getYCoordinate() === two.getYCoordinate()
  );
}

export default class PairBasedExcluderInHorizontalLine
  implements CantBe2CantBe
{
  /**
   * Es wird für jede Box für jede Zahl(1-9) gespeichert, wo sie nicht hin darf.
   */
  private readonly memory: Map<
    SudokuBox,
    Map<SudokuNumber, Array<SudokuPosition>>
  > = PairBasedExcluderInHorizontalLine.init();
  private readonly name = "PairBasedExcluderInHorizontalLine";

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

  finderLogic(cantBes: Array<CantBeFoundEvent>): CantBeFoundEvent[] {
    const results: CantBeFoundEvent[] = [];
    for (let info of cantBes) {
      let position = info.getPosition();
      let nTNumber = info.getNumber();
      let box: SudokuBox = SudokuBox.createByPosition(position);

      const notHeres = this.memory.get(box)?.get(nTNumber);
      if (notHeres && !notHeres.find((it) => samePosition(position, it))) {
        notHeres.push(position);
        if (notHeres.length >= 6 && notHeres.length <= 7) {
          const possiblePositions: SudokuPosition[] = getAllPossiblePositions(
            notHeres,
            box,
          );
          const xCoordinatesOfPossiblePositions: SudokuXCoordinate[] =
            getXCoordinatesOf(possiblePositions);
          if (xCoordinatesOfPossiblePositions.length === 1) {
            // TADA gefunden
            const newCantBeFoundEvent: CantBeFoundEvent[] =
              generateCantBeFoundEventFor(
                xCoordinatesOfPossiblePositions[0],
                nTNumber,
                box,
              );
            results.push(...newCantBeFoundEvent);
          }
        }
      }
    }
    return results;
  }
}

function generateCantBeFoundEventFor(
  xCoordinatesOfPossiblePositions: SudokuXCoordinate,
  nTNumber: SudokuNumber,
  box: SudokuBox,
): CantBeFoundEvent[] {
  const allYCoords: SudokuYCoordinate[] = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  return allYCoords
    .map((yCoordinate) =>
      SudokuPosition.of(xCoordinatesOfPossiblePositions, yCoordinate),
    )
    .filter((pos) => box.allSudokuPositionInThisBox().indexOf(pos) < 0)
    .map(
      (pos) =>
        new CantBeFoundEvent(
          pos,
          nTNumber,
          PairBasedExcluderInHorizontalLine.name,
        ),
    );
}

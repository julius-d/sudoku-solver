import SudokuPosition from "../../sudoku/SudokuPosition";
import CantBeFoundEvent from "../../sudoku/CantBeFoundEvent";
import CantBe2NumberFound from "./CantBe2NumberFound";
import NumberFoundEvent from "../../sudoku/NumberFoundEvent";
import SudokuNumber from "../../sudoku/SudokuNumber";
import SudokuXCoordinate from "../../sudoku/SudokuXCoordinate";
import SudokuYCoordinate from "../../sudoku/SudokuYCoordinate";

export default class OnlyOnePlaceVerticalLine implements CantBe2NumberFound {
  /**
   * Es wird für jede Reihe(0-8) für jede Zahl(1-9) gespeichert, wo sie nicht hin darf.
   */
  private readonly memory: Map<
    SudokuYCoordinate,
    Map<SudokuNumber, Array<SudokuPosition>>
  >;
  private readonly name = "OnlyOnePlaceVerticalLine";

  constructor() {
    this.memory = OnlyOnePlaceVerticalLine.initMemory();
  }

  static initMemory() {
    const numbers: SudokuNumber[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const sudokuYCoordinates: SudokuYCoordinate[] = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    const memory = new Map<
      SudokuYCoordinate,
      Map<SudokuNumber, Array<SudokuPosition>>
    >();
    sudokuYCoordinates.forEach((x) => {
      let map1 = new Map<SudokuNumber, Array<SudokuPosition>>();
      numbers.forEach((i) => {
        map1.set(i, []);
      });
      memory.set(x, map1);
    });
    return memory;
  }

  finderLogic(cantBes: Array<CantBeFoundEvent>): Array<NumberFoundEvent> {
    const result: Array<NumberFoundEvent> = [];
    cantBes.forEach((cantBe) => {
      const canBeForNumberInLine =
        this.memory
          .get(cantBe.getPosition().getYCoordinate())
          ?.get(cantBe.getNumber()) || []; // TODO handle undefined
      if (
        !canBeForNumberInLine.find(
          (it) =>
            it.getXCoordinate() === cantBe.getPosition().getXCoordinate() &&
            it.getYCoordinate() === cantBe.getPosition().getYCoordinate(),
        )
      ) {
        canBeForNumberInLine.push(cantBe.getPosition());
        if (canBeForNumberInLine.length === 8) {
          result.push(
            new NumberFoundEvent(
              OnlyOnePlaceVerticalLine.onlyPossiblePosition(
                canBeForNumberInLine,
              ),
              cantBe.getNumber(),
              this.name,
            ),
          );
        }
      }
    });
    return result;
  }

  private static onlyPossiblePosition(
    canBeForNumberInLine: SudokuPosition[],
  ): SudokuPosition {
    const xCoordinates: SudokuXCoordinate[] = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    for (let i = 0; i < xCoordinates.length; i++) {
      let xCoordinate = xCoordinates[i];
      if (
        !canBeForNumberInLine.find((it) => it.getXCoordinate() === xCoordinate)
      ) {
        return SudokuPosition.of(
          xCoordinate,
          canBeForNumberInLine[0].getYCoordinate(),
        );
      }
    }
    throw new Error("should not happen");
  }
}

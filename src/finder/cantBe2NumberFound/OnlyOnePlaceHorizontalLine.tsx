import SudokuPosition from "../../sudoku/SudokuPosition";
import CantBeFoundEvent from "../../sudoku/CantBeFoundEvent";
import CantBe2NumberFound from "./CantBe2NumberFound";
import NumberFoundEvent from "../../sudoku/NumberFoundEvent";
import SudokuNumber from "../../sudoku/SudokuNumber";

export default class OnlyOnePlaceHorizontalLine implements CantBe2NumberFound {
  /**
   * Es wird für jede Zeile(0-8) für jede Zahl(1-9) gespeichert, wo sie nicht hin darf.
   */
  private memory: Map<number, Map<SudokuNumber, Array<SudokuPosition>>>;
  private readonly name = "OnlyOnePlaceHorizontalLine";

  constructor() {
    this.memory = OnlyOnePlaceHorizontalLine.initMemory();
  }

  private static initMemory() {
    const memory = new Map<number, Map<SudokuNumber, Array<SudokuPosition>>>();
    const numbers: SudokuNumber[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    for (let x: number = 0; x < 9; x++) {
      let map1 = new Map<SudokuNumber, Array<SudokuPosition>>();
      numbers.forEach(i => {
        map1.set(i, []);
      });
      memory.set(x, map1);
    }
    return memory;
  }

  finderLogic(cantBes: Array<CantBeFoundEvent>): Array<NumberFoundEvent> {
    const result: Array<NumberFoundEvent> = [];
    cantBes.forEach(cantBe => {
      const canBeForNumberInLine =
        // @ts-ignore
        this.memory
          .get(cantBe.getPosition().getXCoordinate())
          .get(cantBe.getNumber()) || []; // TODO handle undefine
      if (
        !canBeForNumberInLine.find(
          it =>
            it.getXCoordinate() === cantBe.getPosition().getXCoordinate() &&
            it.getYCoordinate() === cantBe.getPosition().getYCoordinate()
        )
      ) {
        canBeForNumberInLine.push(cantBe.getPosition());
        if (canBeForNumberInLine.length === 8) {
          result.push(
            new NumberFoundEvent(
              OnlyOnePlaceHorizontalLine.onlyPossiblePosition(
                canBeForNumberInLine
              ),
              cantBe.getNumber(),
              this.name
            )
          );
        }
      }
    });
    return result;
  }

  reset() {
    this.memory = OnlyOnePlaceHorizontalLine.initMemory();
  }

  private static onlyPossiblePosition(
    canBeForNumberInLine: SudokuPosition[]
  ): SudokuPosition {
    for (let i = 0; i < 9; i++) {
      if (!canBeForNumberInLine.find(it => it.getYCoordinate() === i)) {
        return new SudokuPosition(canBeForNumberInLine[0].getXCoordinate(), i);
      }
    }
    throw new Error("shoudl not happen");
  }
}

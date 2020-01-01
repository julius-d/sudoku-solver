import SudokuPosition from "../../sudoku/SudokuPosition";
import CantBeFoundEvent from "../../sudoku/CantBeFoundEvent";
import CantBe2NumberFound from "./CantBe2NumberFound";
import NumberFoundEvent from "../../sudoku/NumberFoundEvent";

export default class OnlyOnePlaceHorizontalLine implements CantBe2NumberFound {
  /**
   * Es wird für jede Zeile(0-8) für jede Zahl(1-9) gespeichert, wo sie nicht hin darf.
   */
  speicher: Map<number, Map<number, Array<SudokuPosition>>>;
  name = "OnlyOnePlaceHorizontalLine";

  constructor() {
    this.speicher = OnlyOnePlaceHorizontalLine.initSpeicher();
  }

  static initSpeicher() {
    const speicher = new Map<number, Map<number, Array<SudokuPosition>>>();
    for (let x: number = 0; x < 9; x++) {
      let map1 = new Map<number, Array<SudokuPosition>>();
      for (let i: number = 1; i <= 9; i++) {
        map1.set(i, []);
      }
      speicher.set(x, map1);
    }
    return speicher;
  }

  finderLogic(cantBes: Array<CantBeFoundEvent>): Array<NumberFoundEvent> {
    const result: Array<NumberFoundEvent> = [];
    cantBes.forEach(cantBe => {
      const canBeForNumberInLine =
        // @ts-ignore
        this.speicher
          .get(cantBe.getPosition().getXKoordinate())
          .get(cantBe.getNumber()) || []; // TOOD handle undefine
      if (
        !canBeForNumberInLine.find(
          it =>
            it.getXKoordinate() === cantBe.getPosition().getXKoordinate() &&
            it.getYKoordinate() === cantBe.getPosition().getYKoordinate()
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
    this.speicher = OnlyOnePlaceHorizontalLine.initSpeicher();
  }

  private static onlyPossiblePosition(
    canBeForNumberInLine: SudokuPosition[]
  ): SudokuPosition {
    for (let i = 0; i < 9; i++) {
      if (!canBeForNumberInLine.find(it => it.getYKoordinate() === i)) {
        return new SudokuPosition(canBeForNumberInLine[0].getXKoordinate(), i);
      }
    }
    throw new Error("shoudl not happen");
  }
}

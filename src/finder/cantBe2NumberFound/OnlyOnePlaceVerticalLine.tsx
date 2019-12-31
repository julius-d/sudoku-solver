import AbstractFinder from "./AbstractFinder";
import SudokuPosition from "../../sudoku/SudokuPosition";
import SudokuEvent from "../../sudoku/SudokuEvent";
import SudokuEventType from "../../sudoku/SudokuEventType";

export default class OnlyOnePlaceVerticalLine extends AbstractFinder {
  /**
   * Es wird für jede Reihe(0-8) für jede Zahl(1-9) gespeichert, wo sie nicht hin darf.
   */
  speicher: Map<number, Map<number, Array<SudokuPosition>>>;
  name = "OnlyOnePlaceVerticalLine";

  constructor() {
    super();
    this.speicher = OnlyOnePlaceVerticalLine.initSpeicher();
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

  finderLogic(cantBes: Array<SudokuEvent>): Array<SudokuEvent> {
    const result: Array<SudokuEvent> = [];
    cantBes.forEach(cantBe => {
      const canBeForNumberInLine =
        // @ts-ignore
        this.speicher
          .get(cantBe.getPosition().getYKoordinate())
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
            new SudokuEvent(
              SudokuEventType.NUMBER_FOUND,
              OnlyOnePlaceVerticalLine.onlyPossiblePosition(
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
    this.speicher = OnlyOnePlaceVerticalLine.initSpeicher();
  }

  private static onlyPossiblePosition(
    canBeForNumberInLine: SudokuPosition[]
  ): SudokuPosition {
    for (let i = 0; i < 9; i++) {
      if (!canBeForNumberInLine.find(it => it.getXKoordinate() === i)) {
        return new SudokuPosition(i, canBeForNumberInLine[0].getYKoordinate());
      }
    }
    throw new Error("should not happen");
  }
}

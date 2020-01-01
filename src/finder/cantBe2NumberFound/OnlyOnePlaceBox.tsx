import AbstractFinder from "./AbstractFinder";
import SudokuBox from "../../sudoku/SudokuBox";
import SudokuPosition from "../../sudoku/SudokuPosition";
import CantBeFoundEvent from "../../sudoku/CantBeFoundEvent";
import SudokuEventType from "../../sudoku/SudokuEventType";

function samePosition(one: SudokuPosition, two: SudokuPosition) {
  return (
    one.getXKoordinate() === two.getXKoordinate() &&
    one.getYKoordinate() === two.getYKoordinate()
  );
}

export default class OnlyOnePlaceBox extends AbstractFinder {
  /**
   * Es wird für jede Box für jede Zahl(1-9) gespeichert, wo sie nicht hin darf.
   */
  speicher: Map<
    SudokuBox,
    Map<number, Array<SudokuPosition>>
  > = OnlyOnePlaceBox.init();
  name = "OnlyOnePlaceBox";

  private static init() {
    const speicher = new Map<SudokuBox, Map<number, Array<SudokuPosition>>>();
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        let map1 = new Map<number, Array<SudokuPosition>>();
        speicher.set(SudokuBox.create(x, y), map1);
      }
    }
    speicher.values();
    // @ts-ignore
    for (let map of speicher.values()) {
      for (let i = 1; i <= 9; i++) {
        map.set(i, []);
      }
    }
    return speicher;
  }

  finderLogic(cantBes: Array<CantBeFoundEvent>) {
    const results = [];
    for (let info of cantBes) {
      let position = info.getPosition();
      let nTNumber = info.getNumber();
      let box: SudokuBox = SudokuBox.createByPositon(position);

      // @ts-ignore
      const notHeres = this.speicher.get(box).get(nTNumber);
      if (notHeres && !notHeres.find(it => samePosition(position, it))) {
        notHeres.push(position);
        if (notHeres.length === 8) {
          // @ts-ignore
          for (let newPos of box.allSudokuPositionInThisBox()) {
            if (!notHeres.find(it => samePosition(newPos, it))) {
              results.push(
                new CantBeFoundEvent(
                  SudokuEventType.CANT_BE,
                  newPos,
                  nTNumber,
                  this.name
                )
              ); //FIXME
            }
          }
        }
      }
    }
    return results;
  }
}

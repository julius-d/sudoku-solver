import AbstractFinder from "./AbstractFinder";
import SudokuBox from "../../sudoku/SudokuBox";
import SudokuPosition from "../../sudoku/SudokuPosition";
import SudokuEvent from "../../sudoku/SudokuEvent";
import SudokuEventType from "../../sudoku/SudokuEventType";

export default class OnlyOnePlaceBox extends AbstractFinder {


  /**
   * Es wird für jede Box für jede Zahl(1-9) gespeichert, wo sie nicht hin darf.
   */
  speicher: Map<SudokuBox, Map<number, Array<SudokuPosition>>> = OnlyOnePlaceBox.init();
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
    for (let map of speicher.values()) {
      for (let i = 1; i <= 9; i++) {
        map.set(i, []);
      }
    }
    return speicher;


  }

  finderLogic(cantBes: Array<SudokuEvent>) {
    const results = [];
    const boxes: Array<SudokuBox> = [];
    for (let info of cantBes) {
      let position = info.getPosition();
      let nTNumber = info.getNumber();
      let box: SudokuBox = SudokuBox.createByPositon(position);
      boxes.push(box);
      // @ts-ignore
      this.speicher.get(box).get(nTNumber).push(position);
    }

    for (let box of boxes) {
      //TODO: könnte man effenktiver machen, da nicht alle Zahlen gechekct werden müssen.

      for (let i = 1; i <= 9; i++) {
        // @ts-ignore
        const notHeres = this.speicher.get(box).get(i);
        if (notHeres && notHeres.length === 8) {
          for (let newPos of box.iterator()) {
            if (!notHeres.find(it => newPos.getXKoordinate() === it.getXKoordinate()
                && newPos.getYKoordinate() === it.getYKoordinate())) {
              results.push(new SudokuEvent(SudokuEventType.NUMBER_FOUND, newPos, i, this.name)); //FIXME
            }
          }
        }
      }

    }
    return results;

  }

  reset() {
    init();
  }
}

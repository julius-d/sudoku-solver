import AbstractFinder from "./AbstractFinder";
import SudokuPosition from "../../sudoku/SudokuPosition";
import SudokuEvent from "../../sudoku/SudokuEvent";
import SudokuEventType from "../../sudoku/SudokuEventType";


export default class OnlyOnePlaceHorizontalLine extends AbstractFinder {


  /**
   * Es wird für jede Zeile(0-8) für jede Zahl(1-9) gespeichert, wo sie nicht hin darf.
   */
  speicher: Map<number, Map<number, Set<SudokuPosition>>>;
  name = "OnlyOnePlaceHorizontalLine";

  constructor() {
    super();
    this.speicher = OnlyOnePlaceHorizontalLine.initSpeicher();
  }

  static initSpeicher() {
    const speicher = new Map<number, Map<number, Set<SudokuPosition>>>();
    for (let x: number = 0; x < 9; x++) {
      let map1 = new Map<number, Set<SudokuPosition>>();
      for (let i: number = 1; i <= 9; i++) {
        map1.set(i, new Set<SudokuPosition>());
      }
      speicher.set(x, map1);
    }
    return speicher;
  }

  finderLogic(cantBes: Set<SudokuEvent>) {
    const results : Array<SudokuEvent> = [];
    const lines: Set<number> = new Set<number>();
    cantBes.forEach(info => {
      const position = info.getPosition();
      const nTNumber: number = info.getNumber();
      const line = position.getXKoordinate();
      lines.add(line);
      // @ts-ignore
      this.speicher.get(line).get(nTNumber).add(position);
    });

    lines.forEach(line => {

      //TODO: könnte man effenktiver machen, da nicht alle Zahlen gechekct werden müssen.

      for (let i = 1; i <= 9; i++) {
        // @ts-ignore
        const notHeres: Set<SudokuPosition> = this.speicher.get(line).get(i);
        if (notHeres.size === 8) {
//          System.out.println("########"+i);
//          for(SudokuPosition oldBox:notHeres){
//            System.out.println(oldBox);
//          }
          for (let y = 0; y < 9; y++) {
            const newPos: SudokuPosition = new SudokuPosition(line, y);
            if (!notHeres.has(newPos)) {
              results.push(new SudokuEvent(SudokuEventType.NUMBER_FOUND,
                  newPos, i, this.name));
            }
          }
        }
      }

    });
    return results;
  }

  reset() {
    this.speicher = OnlyOnePlaceHorizontalLine.initSpeicher();
  }

}

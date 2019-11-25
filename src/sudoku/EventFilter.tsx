import SudokuEvent from "./SudokuEvent";
import SudokuEventType from "./SudokuEventType";


export default class EventFilter {

  private numberFound: number[][] = [[], [], [], [], [], [], [], [], []];


  removeAlreadySeen(toFilter: SudokuEvent[]) {
    const filtered = [];

    for (const sudokuEvent of toFilter) {
      if (sudokuEvent.type === SudokuEventType.NUMBER_FOUND) {
        if (!this.numberFound[sudokuEvent.getPosition().getXKoordinate()][sudokuEvent.getPosition().getYKoordinate()]) {
          this.numberFound[sudokuEvent.getPosition().getXKoordinate()][sudokuEvent.getPosition().getYKoordinate()] = sudokuEvent.getNumber();
          filtered.push(sudokuEvent);
        }
        // TODO validate number in case of alerdy seen
      } else {
        // filter CANT BES
        filtered.push(sudokuEvent);
      }
    }
    return filtered;
  }

}

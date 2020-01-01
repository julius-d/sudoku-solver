import SudokuEventType from "./SudokuEventType";
import NumberFoundEvent from "./NumberFoundEvent";

export default class EventFilter {
  private numberFound: number[][] = [[], [], [], [], [], [], [], [], []];

  removeAlreadySeen(toFilter: NumberFoundEvent[]) {
    const filtered = [];

    for (const sudokuEvent of toFilter) {
      if (sudokuEvent.type === SudokuEventType.NUMBER_FOUND) {
        if (
          !this.numberFound[sudokuEvent.getPosition().getXKoordinate()][
            sudokuEvent.getPosition().getYKoordinate()
          ]
        ) {
          this.numberFound[sudokuEvent.getPosition().getXKoordinate()][
            sudokuEvent.getPosition().getYKoordinate()
          ] = sudokuEvent.getNumber();
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

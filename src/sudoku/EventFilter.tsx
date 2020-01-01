import SudokuEventType from "./SudokuEventType";
import NumberFoundEvent from "./NumberFoundEvent";

export default class EventFilter {
  private numberFound: number[][] = [[], [], [], [], [], [], [], [], []];

  removeAlreadySeen(toFilter: NumberFoundEvent[]) {
    const filtered = [];

    for (const numberFoundEvent of toFilter) {
      if (numberFoundEvent.type === SudokuEventType.NUMBER_FOUND) {
        if (
          !this.numberFound[numberFoundEvent.getPosition().getXKoordinate()][
            numberFoundEvent.getPosition().getYKoordinate()
          ]
        ) {
          this.numberFound[numberFoundEvent.getPosition().getXKoordinate()][
            numberFoundEvent.getPosition().getYKoordinate()
          ] = numberFoundEvent.getNumber();
          filtered.push(numberFoundEvent);
        }
        // TODO validate number in case of alerdy seen
      } else {
        // filter CANT BES
        filtered.push(numberFoundEvent);
      }
    }
    return filtered;
  }
}

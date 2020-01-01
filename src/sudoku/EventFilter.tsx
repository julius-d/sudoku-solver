import SudokuEventType from "./SudokuEventType";
import NumberFoundEvent from "./NumberFoundEvent";

export default class EventFilter {
  private numberFound: number[][] = [[], [], [], [], [], [], [], [], []];

  removeAlreadySeen(toFilter: NumberFoundEvent[]) {
    const filtered = [];

    for (const numberFoundEvent of toFilter) {
      if (numberFoundEvent.type === SudokuEventType.NUMBER_FOUND) {
        if (
          !this.numberFound[numberFoundEvent.getPosition().getXCoordinate()][
            numberFoundEvent.getPosition().getYCoordinate()
          ]
        ) {
          this.numberFound[numberFoundEvent.getPosition().getXCoordinate()][
            numberFoundEvent.getPosition().getYCoordinate()
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

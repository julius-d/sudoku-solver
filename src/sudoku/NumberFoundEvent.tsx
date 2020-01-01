import SudokuPosition from "./SudokuPosition";
import SudokuEventType from "./SudokuEventType";

export default class NumberFoundEvent {
  type = SudokuEventType.NUMBER_FOUND;
  position: SudokuPosition;
  number: number;
  from: string;

  constructor(position: SudokuPosition, number: number, from: string) {
    this.position = position;
    this.number = number;
    this.from = from;
  }

  getNumber() {
    return this.number;
  }

  getPosition() {
    return this.position;
  }

  getFrom() {
    return this.from;
  }
}

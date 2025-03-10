import SudokuPosition from "./SudokuPosition";
import SudokuEventType from "./SudokuEventType";
import SudokuNumber from "./SudokuNumber";

export default class NumberFoundEvent {
  readonly type = SudokuEventType.NUMBER_FOUND;
  readonly position: SudokuPosition;
  readonly number: SudokuNumber;
  readonly from: string;

  constructor(position: SudokuPosition, number: SudokuNumber, from: string) {
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

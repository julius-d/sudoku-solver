import SudokuPosition from "./SudokuPosition";
import SudokuEventType from "./SudokuEventType";
import SudokuNumber from "./SudokuNumber";

export default class CantBeFoundEvent {
  readonly type: SudokuEventType = SudokuEventType.CANT_BE;
  readonly position: SudokuPosition;
  readonly number: SudokuNumber;
  readonly from: string;

  constructor(postion: SudokuPosition, number: SudokuNumber, from: string) {
    this.position = postion;
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

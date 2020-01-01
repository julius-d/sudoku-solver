import SudokuPosition from "./SudokuPosition";
import SudokuEventType from "./SudokuEventType";

export default class CantBeFoundEvent {
  readonly type: SudokuEventType = SudokuEventType.CANT_BE;
  readonly position: SudokuPosition;
  readonly number: number;
  readonly from: string;

  constructor(postion: SudokuPosition, number: number, from: string) {
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

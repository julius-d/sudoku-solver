import SudokuPosition from "./SudokuPosition";
import SudokuEventType from "./SudokuEventType";

export default class CantBeFoundEvent {
  readonly type: SudokuEventType;
  readonly position: SudokuPosition;
  readonly number: number;
  readonly from: string;

  constructor(
    type: SudokuEventType,
    postion: SudokuPosition,
    number: number,
    from: string
  ) {
    this.type = type;
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

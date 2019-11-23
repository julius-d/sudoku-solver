import SudokuPosition from "./SudokuPosition";
import SudokuEventType from "./SudokuEventType";

export default class SudokuEvent {

  type : SudokuEventType;
  position: SudokuPosition;
  number : number;
  from: string;

  constructor(type : SudokuEventType, postion: SudokuPosition, number: number, from: string) {
    this.type = type;
    this.position = postion;
    this.number = number;
    this.from = from;
  }

  getNumber() {
    return this.number;
  }

  setNumber(number: number) {
    this.number = number;
  }

  getPosition() {
    return this.position;
  }

  setPosition(postion: SudokuPosition) {
    this.position = postion;
  }

  getFrom() {
    return this.from;
  }


}

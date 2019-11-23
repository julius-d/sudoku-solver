export default class SudokuEvent {

  position;
  number;
  from;

  constructor(postion, number, from) {
    this.position = postion;
    this.number = number;
    this.from = from;
  }

  getNumber() {
    return this.number;
  }

  setNumber(number) {
    this.number = number;
  }

  getPosition() {
    return this.position;
  }

  setPosition(postion) {
    this.position = postion;
  }

  getFrom() {
    return this.from;
  }

  setFrom(from) {
    this.from = from;
  }

}

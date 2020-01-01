import CantBeFoundEvent from "../../sudoku/CantBeFoundEvent";
import NumberFoundEvent from "../../sudoku/NumberFoundEvent";
import NumberFound2CantBe from "./NumberFound2CantBe";

export default class OnePositonCantBeRule implements NumberFound2CantBe {
  name = "OnePositonCantBeRule";

  finderLogic(numberFoundEvent: NumberFoundEvent) {
    const result = [];
    for (let i = 1; i <= 9; i++) {
      if (i !== numberFoundEvent.getNumber()) {
        result.push(
          new CantBeFoundEvent(numberFoundEvent.getPosition(), i, this.name)
        );
      }
    }
    return result;
  }
}

import NumberFoundEvent from "../../sudoku/NumberFoundEvent";
import CantBeFoundEvent from "../../sudoku/CantBeFoundEvent";

export default interface NumberFound2CantBe {
  finderLogic(numberFoundEvent: NumberFoundEvent): CantBeFoundEvent[];
}

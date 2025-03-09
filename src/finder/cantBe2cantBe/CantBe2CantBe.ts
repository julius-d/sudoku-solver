import CantBeFoundEvent from "../../sudoku/CantBeFoundEvent";
import NumberFoundEvent from "../../sudoku/NumberFoundEvent";

export default interface CantBe2CantBe {
  finderLogic(cantBes: CantBeFoundEvent[]): CantBeFoundEvent[];
}

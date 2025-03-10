import CantBeFoundEvent from "../../sudoku/CantBeFoundEvent";
import NumberFoundEvent from "../../sudoku/NumberFoundEvent";

export default interface CantBe2NumberFound {
  finderLogic(cantBes: CantBeFoundEvent[]): NumberFoundEvent[];
}

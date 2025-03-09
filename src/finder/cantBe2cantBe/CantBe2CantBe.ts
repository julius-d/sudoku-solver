import CantBeFoundEvent from "../../sudoku/CantBeFoundEvent";

export default interface CantBe2CantBe {
  finderLogic(cantBes: CantBeFoundEvent[]): CantBeFoundEvent[];
}

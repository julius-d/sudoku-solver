import NumberFoundEvent from "../../sudoku/NumberFoundEvent";
import SudokuEvent from "../../sudoku/SudokuEvent";

export default interface NumberFound2CantBe {
  finderLogic(numberFoundEvent: NumberFoundEvent): SudokuEvent[];
}

import AbstractCantBe from "./AbstractCantBe";
import SudokuEvent from "../../sudoku/SudokuEvent";
import SudokuPosition from "../../sudoku/SudokuPosition";
import SudokuEventType from "../../sudoku/SudokuEventType";

export default class VerticalCantBeRule extends AbstractCantBe {

	name = "VerticalCantBeRule";

	finderLogic(numberFoundEvent: SudokuEvent) {
		const result = [];
		
		let yk = numberFoundEvent.getPosition().getYKoordinate();
		for(let xk=0;xk<9;xk++) {
			if (xk !== numberFoundEvent.getPosition().getXKoordinate()) {
				result.push(new SudokuEvent(
						SudokuEventType.CANT_BE,
						new SudokuPosition(xk, yk), numberFoundEvent.getNumber(), this.name));
			}
		}
		return result;
	}

}

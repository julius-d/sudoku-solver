import AbstractCantBe from "./AbstractCantBe";
import SudokuEvent from "../../sudoku/SudokuEvent";
import SudokuPosition from "../../sudoku/SudokuPosition";
import SudokuEventType from "../../sudoku/SudokuEventType";

export default class VerticalCantBeRule extends AbstractCantBe {

	name = "VerticalCantBeRule";

	constructor() {
		super("VerticalCantBeRule");
	}

	finderLogic(numberFoundEvent) {
		const result = [];
		
		let yk = numberFoundEvent.getPosition().getYKoordinate();
		for(let xk=0;xk<9;xk++){
			result.push(new SudokuEvent(
					SudokuEventType.CANT_BE,
					new SudokuPosition(xk, yk), numberFoundEvent.getNumber(), this.name));
		}
		return result;
	}

}

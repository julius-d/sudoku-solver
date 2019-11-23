import AbstractCantBe from "./AbstractCantBe";
import SudokuEvent from "../../sudoku/SudokuEvent";
import SudokuPosition from "../../sudoku/SudokuPosition";

export default class VerticalCantBeRule extends AbstractCantBe {

	constructor() {
		super("VerticalCantBeRule");
	}

	finderLogic(numberFoundEvent) {
		const result = [];
		
		let yk = numberFoundEvent.getPosition().getYKoordinate();
		for(let xk=0;xk<9;xk++){
			result.push(new SudokuEvent(new SudokuPosition(xk,yk),numberFoundEvent.getNumber(),this));
		}
		return result;
	}

}

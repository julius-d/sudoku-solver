import AbstractCantBe from "./AbstractCantBe";
import SudokuEvent from "../../sudoku/SudokuEvent";
import SudokuPosition from "../../sudoku/SudokuPosition";

export default class HorizontalCantBeRule extends AbstractCantBe {

	
	constructor() {
		super("HorizontalCantBeRule");
	}


finderLogic(numberFoundEvent) {
		const result = [];
		
		let xk = numberFoundEvent.getPosition().getXKoordinate();
		for(let yk=0;yk<9;yk++){
			result.push(new SudokuEvent(new SudokuPosition(xk,yk),numberFoundEvent.getNumber(),this));
		}
		
		return result;
		
	}


}

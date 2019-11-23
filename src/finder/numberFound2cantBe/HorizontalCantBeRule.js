import AbstractCantBe from "./AbstractCantBe";
import SudokuEvent from "../../sudoku/SudokuEvent";
import SudokuPosition from "../../sudoku/SudokuPosition";
import SudokuEventType from "../../sudoku/SudokuEventType";

export default class HorizontalCantBeRule extends AbstractCantBe {

	name = "HorizontalCantBeRule";

	constructor() {
		super("HorizontalCantBeRule");
	}


finderLogic(numberFoundEvent) {
		const result = [];
		
		let xk = numberFoundEvent.getPosition().getXKoordinate();
		for(let yk=0;yk<9;yk++){
			result.push(new SudokuEvent(SudokuEventType.CANT_BE, new SudokuPosition(xk,yk),numberFoundEvent.getNumber(),this.name));
		}
		
		return result;
		
	}


}

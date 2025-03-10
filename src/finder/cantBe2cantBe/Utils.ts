import SudokuPosition from "../../sudoku/SudokuPosition";
import SudokuBox from "../../sudoku/SudokuBox";
import SudokuYCoordinate from "../../sudoku/SudokuYCoordinate";
import SudokuXCoordinate from "../../sudoku/SudokuXCoordinate";

export function getAllPossiblePositions(notHeres: SudokuPosition[], box: SudokuBox): SudokuPosition[] {
  return box.allSudokuPositionInThisBox().filter(pos => notHeres.indexOf(pos) < 0);
}

export function getYCoordinatesOf(possiblePositions: SudokuPosition[]): SudokuYCoordinate[] {
  return distinct(possiblePositions.map(pos => pos.getYCoordinate()));
}

export function getXCoordinatesOf(possiblePositions: SudokuPosition[]): SudokuXCoordinate[] {
  return distinct(possiblePositions.map(pos => pos.getXCoordinate()));
}

function distinct<T>(list: T[]): T[] {
  return list.filter((e, i, self) => i === self.indexOf(e));
}

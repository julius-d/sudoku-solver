import SudokuBox from "./SudokuBox";
import SudokuXCoordinate from "./SudokuXCoordinate";
import SudokuYCoordinate from "./SudokuYCoordinate";
import SudokuPosition from "./SudokuPosition";

export function isValidSudoku(field: string[][]): boolean {
  const rows = new Array(9).fill(0).map(() => new Set<string>());
  const cols = new Array(9).fill(0).map(() => new Set<string>());
  const boxes: Map<SudokuBox, Set<string>> = new Map();
  SudokuBox.getAll().forEach(box => boxes.set(box, new Set<string>()));

  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      const value = field[x][y];
      if (value!= undefined &&  value !== '_') {
        const box = SudokuBox.createByPosition(SudokuPosition.of(x as SudokuXCoordinate, y as SudokuYCoordinate));

        if (rows[x].has(value) || cols[y].has(value) || boxes.get(box)!.has(value)) {
          return false;
        }

        rows[x].add(value);
        cols[y].add(value);
        boxes.get(box)!.add(value);
      }
    }
  }

  return true;
}

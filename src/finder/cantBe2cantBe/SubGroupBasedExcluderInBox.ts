import CantBeFoundEvent from "../../sudoku/CantBeFoundEvent";
import CantBe2CantBe from "./CantBe2CantBe";
import SudokuPosition from "../../sudoku/SudokuPosition";
import SudokuBox from "../../sudoku/SudokuBox";
import SudokuNumber from "../../sudoku/SudokuNumber";

export default class SubGroupBasedExcluderInBox implements CantBe2CantBe {
  private readonly boxMap: Map<SudokuBox, Map<SudokuPosition, Set<SudokuNumber>>>;

  constructor() {
    this.boxMap = new Map();
    for (const box of SudokuBox.getAll()) {
      const positionMap = new Map<SudokuPosition, Set<SudokuNumber>>();
      for (const position of box.allSudokuPositionInThisBox()) {
        positionMap.set(position, new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]));
      }
      this.boxMap.set(box, positionMap);
    }
  }

  finderLogic(cantBes: Array<CantBeFoundEvent>): CantBeFoundEvent[] {
    const results: CantBeFoundEvent[] = [];
    const affectedBoxes: Set<SudokuBox> = new Set();

    // Update boxMap with new cantBes and track affected boxes
    for (const cantBe of cantBes) {
      const box = SudokuBox.createByPosition(cantBe.getPosition());
      const position = cantBe.getPosition();
      const number = cantBe.getNumber();
      const positionMap = this.boxMap.get(box)!;
      if (positionMap.get(position)!.delete(number)) {
        affectedBoxes.add(box);
      }
    }

    // Find pairs of positions with the same two possible numbers within each affected box
    for (const box of affectedBoxes) {
      const positionMap = this.boxMap.get(box)!;
      const pairs: [SudokuPosition, SudokuPosition][] = [];
      const positions = Array.from(positionMap.entries());

      for (let i = 0; i < positions.length; i++) {
        for (let j = i + 1; j < positions.length; j++) {
          const [pos1, numbers1] = positions[i];
          const [pos2, numbers2] = positions[j];
          if (numbers1.size === 2 && numbers2.size === 2 && [...numbers1].every(n => numbers2.has(n))) {
            pairs.push([pos1, pos2]);
          }
        }
      }

      // Generate CantBeFoundEvent for other positions in the box
      for (const [pos1, pos2] of pairs) {
        const numbers = Array.from(positionMap.get(pos1)!);
        const otherPositions = Array.from(box.allSudokuPositionInThisBox()).filter(pos => pos !== pos1 && pos !== pos2);
        for (const number of numbers) {
          results.push(...generateCantBeFoundEventForPositions(otherPositions, number));
        }
      }
    }

    return results;
  }
}

function generateCantBeFoundEventForPositions(
  positions: SudokuPosition[],
  number: SudokuNumber,
): CantBeFoundEvent[] {
  return positions.map(
    (pos) =>
      new CantBeFoundEvent(
        pos,
        number,
        SubGroupBasedExcluderInBox.name,
      ),
  );
}

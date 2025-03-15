import CantBeFoundEvent from "../../sudoku/CantBeFoundEvent";
import CantBe2CantBe from "./CantBe2CantBe";
import SudokuPosition from "../../sudoku/SudokuPosition";
import SudokuBox from "../../sudoku/SudokuBox";
import SudokuNumber from "../../sudoku/SudokuNumber";

export default class SubGroupBasedExcluderInBox implements CantBe2CantBe {
  private readonly boxToPositionsToPossibleNumbers: Map<SudokuBox, Map<SudokuPosition, Set<SudokuNumber>>>;

  constructor() {
    this.boxToPositionsToPossibleNumbers = new Map();
    for (const box of SudokuBox.getAll()) {
      const positionToPossibleNumbers = new Map<SudokuPosition, Set<SudokuNumber>>();
      for (const position of box.allSudokuPositionInThisBox()) {
        positionToPossibleNumbers.set(position, new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]));
      }
      this.boxToPositionsToPossibleNumbers.set(box, positionToPossibleNumbers);
    }
  }

  finderLogic(cantBes: Array<CantBeFoundEvent>): CantBeFoundEvent[] {
    const results: CantBeFoundEvent[] = [];
    const affectedBoxes: Set<SudokuBox> = new Set();

    // Update boxToPositionsToPossibleNumbers with new cantBes and track affected boxes
    for (const cantBe of cantBes) {
      const box = SudokuBox.createByPosition(cantBe.getPosition());
      const position = cantBe.getPosition();
      const number = cantBe.getNumber();
      const positionsToPossibleNumber = this.boxToPositionsToPossibleNumbers.get(box)!;
      if (positionsToPossibleNumber.get(position)!.delete(number)) {
        affectedBoxes.add(box);
      }
    }

    // Find groups of positions with the same possible numbers within each affected box
    for (const box of affectedBoxes) {
      const positionsToPossibleNumber = this.boxToPositionsToPossibleNumbers.get(box)!;
      const positionsWithPossibleNumber = Array.from(positionsToPossibleNumber.entries());

      for (let groupSize = 2; groupSize <= 8; groupSize++) {
        const groups: [SudokuPosition, Set<SudokuNumber>][][] = this.findGroups(positionsWithPossibleNumber, groupSize);
        for (const group of groups) {
          const numbers = Array.from(group[0][1]);
          const otherPositions = Array.from(box.allSudokuPositionInThisBox()).filter(pos => !group.some(([gPos]) => gPos === pos));
          for (const number of numbers) {
            results.push(...generateCantBeFoundEventForPositions(otherPositions, number));
          }
        }
      }
    }

    return results;
  }

  private findGroups(positionsWithPossibleNumber: [SudokuPosition, Set<SudokuNumber>][], groupSize: number): [SudokuPosition, Set<SudokuNumber>][][] {
    const groups: [SudokuPosition, Set<SudokuNumber>][][] = [];
    const combinations: [SudokuPosition, Set<SudokuNumber>][][] = this.getCombinations(positionsWithPossibleNumber, groupSize);

    for (const combination of combinations) {
      const [firstPos, firstNumbers] = combination[0];
      if (firstNumbers.size === groupSize && combination.every(([, numbers]) => this.setsAreEqual(numbers, firstNumbers))) {
        groups.push(combination);
      }
    }

    return groups;
  }

  private getCombinations(positionsWithPossibleNumber: [SudokuPosition, Set<SudokuNumber>][], groupSize: number): [SudokuPosition, Set<SudokuNumber>][][] {
    if (groupSize > positionsWithPossibleNumber.length) return [];
    if (groupSize === 1) return positionsWithPossibleNumber.map(item => [item]);

    const combinations: [SudokuPosition, Set<SudokuNumber>][][] = [];
    positionsWithPossibleNumber.forEach((item: [SudokuPosition, Set<SudokuNumber>], index) => {
      const smallerCombinations = this.getCombinations(positionsWithPossibleNumber.slice(index + 1), groupSize - 1);
      smallerCombinations.forEach(smallerCombination => {
        combinations.push([item, ...smallerCombination]);
      });
    });

    return combinations;
  }

  private setsAreEqual(setA: Set<any>, setB: Set<any>): boolean {
    if (setA.size !== setB.size) return false;
    for (const a of setA) if (!setB.has(a)) return false;
    return true;
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

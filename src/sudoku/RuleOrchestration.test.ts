import NumberFoundEvent from "./NumberFoundEvent";
import RuleOrchestration from "./RuleOrchestration";
import SudokuPosition from "./SudokuPosition";
import SudokuEventType from "./SudokuEventType";
import CantBeFoundEvent from "./CantBeFoundEvent";
import SudokuNumber from "./SudokuNumber";
import SudokuXCoordinate from "./SudokuXCoordinate";
import SudokuYCoordinate from "./SudokuYCoordinate";
import {isValidSudoku} from "./ResultValidator";

describe("RuleOrchestration", () => {
  let ruleOrchestration: RuleOrchestration;
  let field: string[][];

  beforeEach(() => {
    ruleOrchestration = new RuleOrchestration();
    field = [[], [], [], [], [], [], [], [], []];
  });

  it("solves sudoku", () => {
    givenNumbers(`
      ┌───────┬───────┬───────┐
      │ _ 1 _ │ 4 _ _ │ 8 2 _ │
      │ _ 8 _ │ 1 _ _ │ 5 _ 9 │
      │ 9 7 _ │ _ _ _ │ _ _ _ │
      ├───────┼───────┼───────┤
      │ 8 _ 4 │ _ 6 _ │ _ _ _ │
      │ _ _ 9 │ _ 2 _ │ _ 4 _ │
      │ _ _ _ │ _ _ _ │ 2 1 6 │
      ├───────┼───────┼───────┤
      │ 3 _ _ │ 6 8 5 │ _ 7 _ │
      │ _ _ _ │ _ _ 4 │ _ 9 1 │
      │ 6 _ _ │ _ _ 2 │ _ _ _ │
      └───────┴───────┴───────┘
    `);

    thenSolutionIs(`
      ┌───────┬───────┬───────┐
      │ 5 1 3 │ 4 9 6 │ 8 2 7 │
      │ 4 8 2 │ 1 3 7 │ 5 6 9 │
      │ 9 7 6 │ 2 5 8 │ 1 3 4 │
      ├───────┼───────┼───────┤
      │ 8 2 4 │ 7 6 1 │ 9 5 3 │
      │ 1 6 9 │ 5 2 3 │ 7 4 8 │
      │ 7 3 5 │ 8 4 9 │ 2 1 6 │
      ├───────┼───────┼───────┤
      │ 3 9 1 │ 6 8 5 │ 4 7 2 │
      │ 2 5 8 │ 3 7 4 │ 6 9 1 │
      │ 6 4 7 │ 9 1 2 │ 3 8 5 │
      └───────┴───────┴───────┘
    `);
  });

  it("solves hard sudoku", () => {
    givenNumbers(`
      ┌───────┬───────┬───────┐
      │ 9 _ _ │ _ _ 1 │ 4 _ _ │
      │ _ 7 _ │ _ _ _ │ _ 8 _ │
      │ _ _ _ │ 6 _ 5 │ _ 1 _ │
      ├───────┼───────┼───────┤
      │ _ _ 4 │ _ 6 _ │ _ 3 _ │
      │ 1 _ _ │ _ 9 _ │ _ _ 2 │
      │ _ 9 _ │ _ 5 _ │ 1 _ _ │
      ├───────┼───────┼───────┤
      │ _ 3 _ │ 8 _ 2 │ _ _ _ │
      │ _ 8 _ │ _ _ _ │ _ 7 _ │
      │ _ _ 6 │ 3 _ _ │ _ _ 4 │
      └───────┴───────┴───────┘
    `);

    thenSolutionIs(`
      ┌───────┬───────┬───────┐
      │ 9 6 8 │ 7 3 1 │ 4 2 5 │
      │ 5 7 1 │ 9 2 4 │ 3 8 6 │
      │ 3 4 2 │ 6 8 5 │ 9 1 7 │
      ├───────┼───────┼───────┤
      │ 8 2 4 │ 1 6 7 │ 5 3 9 │
      │ 1 5 3 │ 4 9 8 │ 7 6 2 │
      │ 6 9 7 │ 2 5 3 │ 1 4 8 │
      ├───────┼───────┼───────┤
      │ 7 3 5 │ 8 4 2 │ 6 9 1 │
      │ 4 8 9 │ 5 1 6 │ 2 7 3 │
      │ 2 1 6 │ 3 7 9 │ 8 5 4 │
      └───────┴───────┴───────┘
    `);
  });

  function handleEvent(numberFoundEvent: NumberFoundEvent | CantBeFoundEvent) {
    if (numberFoundEvent.type === SudokuEventType.NUMBER_FOUND) {
      let position = numberFoundEvent.getPosition();
      let existingValue = field[position.getXCoordinate()][position.getYCoordinate()];
      let newValue = numberFoundEvent.getNumber().toString(10);
      if (!!existingValue && existingValue !== '_' && existingValue !== newValue) {
        throw new Error(`Conflict at position (${position.getXCoordinate()}, ${position.getYCoordinate()}): existing value ${existingValue}, new value ${newValue}`);
      } else {
        field[position.getXCoordinate()][position.getYCoordinate()] = newValue;
        if (!isValidSudoku(field)) {
          console.log("Invalid: " + formatFoundNumbers());
          throw new Error(`Invalid Sudoku state after placing ${newValue} at position (${position.getXCoordinate()}, ${position.getYCoordinate()}) rule: ${numberFoundEvent.getFrom()}`);
        }
      }
    }
  }


  function givenNumbers(lines: string) {
    const formattedLines = lines.replace(/[^0-9_]/g, "").match(/.{1,9}/g) || [];
    formattedLines.forEach((line, lineIndex) => {
      line.split("").forEach((givenNumber, rowIndex) => {
        if (!field[lineIndex][rowIndex]) {
          field[lineIndex][rowIndex] = givenNumber;
          if (givenNumber !== "_") {
            let numberFoundEvent = new NumberFoundEvent(
              SudokuPosition.of(
                lineIndex as SudokuXCoordinate,
                rowIndex as SudokuYCoordinate,
              ),
              parseInt(givenNumber, 10) as SudokuNumber,
              "USER",
            );
            handleEvent(numberFoundEvent);
            ruleOrchestration.handleGivenNumber(numberFoundEvent, handleEvent);
          }
        }
      });
    });
  }

  function thenSolutionIs(expected: string) {
    const solution = formatFoundNumbers();
    if (!isValidSudoku(field)) {
      throw new Error(`invalid solution ${solution}`)
    }
    const trimmedExpected = expected.trim().split('\n').map(line => line.trim()).join('\n');
    expect(solution).toEqual(trimmedExpected);
  }

  function formatFoundNumbers(): string {
    const topBorder = '┌───────┬───────┬───────┐';
    const horizontalDivider = '├───────┼───────┼───────┤';
    const bottomBorder = '└───────┴───────┴───────┘';

    const formattedRows = field.map((row, index) => {
      const formattedRow = '│ ' + row.map((cell, i) => {
        const separator = (i === 2 || i === 5) ? ' │ ' : ' ';
        return (cell || '_') + separator;
      }).join('') + '│';
      if (index === 2 || index === 5) {
        return formattedRow + '\n' + horizontalDivider;
      }
      return formattedRow;
    });

    return [topBorder, ...formattedRows, bottomBorder].join('\n');
  }

});

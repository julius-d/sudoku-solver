import NumberFoundEvent from "./NumberFoundEvent";
import RuleOrchestration from "./RuleOrchestration";
import SudokuPosition from "./SudokuPosition";
import SudokuEventType from "./SudokuEventType";
import CantBeFoundEvent from "./CantBeFoundEvent";
import SudokuNumber from "./SudokuNumber";
import SudokuXCoordinate from "./SudokuXCoordinate";
import SudokuYCoordinate from "./SudokuYCoordinate";

describe("RuleOrchestration", () => {
  let ruleOrchestration = new RuleOrchestration();
  let field: string[][] = [[], [], [], [], [], [], [], [], []];

  it("solves sudoku", () => {
    givenNumbers([
      "_1_4__82_",
      "_8_1__5_9",
      "97_______",
      "8_4_6____",
      "__9_2__4_",
      "______216",
      "3__685_7_",
      "_____4_91",
      "6____2___"
    ]);

    thenSolutionIs([
      "513496827",
      "482137569",
      "976258134",
      "824761953",
      "169523748",
      "735849216",
      "391685472",
      "258374691",
      "647912385"
    ]);
  });

  function handleEvent(numberFoundEvent: NumberFoundEvent | CantBeFoundEvent) {
    if (numberFoundEvent.type === SudokuEventType.NUMBER_FOUND) {
      let position = numberFoundEvent.getPosition();
      field[position.getXCoordinate()][
        position.getYCoordinate()
      ] = numberFoundEvent.getNumber().toString(10);
    }
  }

  function givenNumbers(lines: string[]) {
    lines.forEach((line, lineIndex) => {
      line.split("").forEach((givenNumber, rowIndex) => {
        if (!field[lineIndex][rowIndex]) {
          field[lineIndex][rowIndex] = givenNumber;
          if (givenNumber !== "_") {
            let numberFoundEvent = new NumberFoundEvent(
              SudokuPosition.of(
                lineIndex as SudokuXCoordinate,
                rowIndex as SudokuYCoordinate
              ),
              parseInt(givenNumber, 10) as SudokuNumber,
              "USER"
            );
            ruleOrchestration.handleGivenNumber(numberFoundEvent, handleEvent);
          }
        }
      });
    });
  }

  function thenSolutionIs(expected: string[]) {
    let solution: string[] = field.map(row => row.join(""));
    expect(solution).toEqual(expected);
  }
});

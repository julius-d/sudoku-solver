import BoxCantBeRule from "../finder/numberFound2cantBe/BoxCantBeRule";
import HorizontalCantBeRule from "../finder/numberFound2cantBe/HorizontalCantBeRule";
import VerticalCantBeRule from "../finder/numberFound2cantBe/VerticalCantBeRule";
import OnePositonCantBeRule from "../finder/numberFound2cantBe/OnePositonCantBeRule";
import OnlyOnePlaceHorizontalLine from "../finder/cantBe2NumberFound/OnlyOnePlaceHorizontalLine";
import OnlyOnePlaceVerticalLine from "../finder/cantBe2NumberFound/OnlyOnePlaceVerticalLine";
import OnlyOnePlaceBox from "../finder/cantBe2NumberFound/OnlyOnePlaceBox";
import OnePositionFinder from "../finder/cantBe2NumberFound/OnePositionFinder";
import EventFilter from "./EventFilter";
import CantBeFoundEvent from "./CantBeFoundEvent";
import NumberFound2CantBe from "../finder/numberFound2cantBe/NumberFound2CantBe";
import NumberFoundEvent from "./NumberFoundEvent";

let numberFound2cantBeRules: NumberFound2CantBe[] = [
  new BoxCantBeRule(),
  new HorizontalCantBeRule(),
  new VerticalCantBeRule(),
  new OnePositonCantBeRule()
];

let cantBe2NumberFound = [
  new OnlyOnePlaceHorizontalLine(),
  new OnlyOnePlaceVerticalLine(),
  new OnlyOnePlaceBox(),
  new OnePositionFinder()
];

let eventFilter = new EventFilter();

export default class RuleOrchestration {
  handleGivenNumber(
    sudokuEvent: NumberFoundEvent,
    postMessage: (e: CantBeFoundEvent | NumberFoundEvent) => void
  ) {
    let foundNumbers = [sudokuEvent];
    do {
      let cantBeRulesResults: CantBeFoundEvent[] = [];
      for (const rule of numberFound2cantBeRules) {
        for (const foundNumber of foundNumbers) {
          cantBeRulesResults = cantBeRulesResults.concat(
            rule.finderLogic(foundNumber)
          );
        }
      }
      cantBeRulesResults.forEach(it => {
        postMessage(it);
      });

      foundNumbers = [];
      for (const rule of cantBe2NumberFound) {
        foundNumbers = foundNumbers.concat(
          rule.finderLogic(cantBeRulesResults)
        );
      }
      foundNumbers = eventFilter.removeAlreadySeen(foundNumbers);
      foundNumbers.forEach(foundNumbers => {
        postMessage(foundNumbers);
      });
    } while (foundNumbers.length > 0);
  }
}

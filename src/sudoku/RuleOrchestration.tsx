import BoxCantBeRule from "../finder/numberFound2cantBe/BoxCantBeRule";
import HorizontalCantBeRule from "../finder/numberFound2cantBe/HorizontalCantBeRule";
import VerticalCantBeRule from "../finder/numberFound2cantBe/VerticalCantBeRule";
import OnePositionCantBeRule from "../finder/numberFound2cantBe/OnePositionCantBeRule";
import OnlyOnePlaceHorizontalLine from "../finder/cantBe2NumberFound/OnlyOnePlaceHorizontalLine";
import OnlyOnePlaceVerticalLine from "../finder/cantBe2NumberFound/OnlyOnePlaceVerticalLine";
import OnlyOnePlaceBox from "../finder/cantBe2NumberFound/OnlyOnePlaceBox";
import OnePositionFinder from "../finder/cantBe2NumberFound/OnePositionFinder";
import EventFilter from "./EventFilter";
import CantBeFoundEvent from "./CantBeFoundEvent";
import NumberFound2CantBe from "../finder/numberFound2cantBe/NumberFound2CantBe";
import NumberFoundEvent from "./NumberFoundEvent";
import CantBe2NumberFound from "../finder/cantBe2NumberFound/CantBe2NumberFound";
import CantBe2CantBe from "../finder/cantBe2cantBe/CantBe2CantBe";
import PairBasedExcluderInVerticalLine from "../finder/cantBe2cantBe/PairBasedExcluderInVerticalLine";


export default class RuleOrchestration {

  private numberFound2cantBeRules: NumberFound2CantBe[];
  private cantBe2NumberFound: CantBe2NumberFound[];
  private cantBe2CantBe: CantBe2CantBe[];
  private eventFilter: EventFilter;

  constructor() {
    this.numberFound2cantBeRules = [
      new BoxCantBeRule(),
      new HorizontalCantBeRule(),
      new VerticalCantBeRule(),
      new OnePositionCantBeRule()
    ];

    this.cantBe2NumberFound = [
      new OnlyOnePlaceHorizontalLine(),
      new OnlyOnePlaceVerticalLine(),
      new OnlyOnePlaceBox(),
      new OnePositionFinder()
    ];

    this.cantBe2CantBe = [
      new PairBasedExcluderInVerticalLine()
    ]

    this.eventFilter = new EventFilter();
  }

  handleGivenNumber(
    numberFoundEvent: NumberFoundEvent,
    postMessage: (e: CantBeFoundEvent | NumberFoundEvent) => void
  ) {
    let foundNumbers = this.eventFilter.removeAlreadySeen([numberFoundEvent]);
    do {
      let cantBeRulesResults: CantBeFoundEvent[] = [];
      for (const rule of this.numberFound2cantBeRules) {
        for (const foundNumber of foundNumbers) {
          cantBeRulesResults = cantBeRulesResults.concat(
            rule.finderLogic(foundNumber)
          );
        }
      }

      for (const rule of this.cantBe2CantBe) {
        for (const cantBe of cantBeRulesResults) {
          cantBeRulesResults = cantBeRulesResults.concat(
            rule.finderLogic(cantBeRulesResults)
          );
        }
      }

      cantBeRulesResults.forEach(it => {
        postMessage(it);
      });

      foundNumbers = [];
      for (const rule of this.cantBe2NumberFound) {
        foundNumbers = foundNumbers.concat(
          rule.finderLogic(cantBeRulesResults)
        );
      }
      foundNumbers = this.eventFilter.removeAlreadySeen(foundNumbers);
      foundNumbers.forEach(foundNumbers => {
        postMessage(foundNumbers);
      });
    } while (foundNumbers.length > 0);
  }
}

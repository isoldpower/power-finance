import { BalanceCompositionContainer } from "./BalanceCompositionContainer.tsx";
import { BalanceCompositionTitle } from "./BalanceCompositionTitle.tsx";
import { BalanceCompositionFormula } from "./BalanceCompositionFormula.tsx";
import { BalanceCompositionHint } from "./BalanceCompositionHint.tsx";


function BalanceComposition() {
	return null;
}

BalanceComposition.displayName = 'BalanceComposition';
BalanceComposition.Container = BalanceCompositionContainer;
BalanceComposition.Title = BalanceCompositionTitle;
BalanceComposition.Formula = BalanceCompositionFormula;
BalanceComposition.Hint = BalanceCompositionHint;

export { BalanceComposition };

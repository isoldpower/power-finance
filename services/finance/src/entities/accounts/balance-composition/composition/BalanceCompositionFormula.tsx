import { FinanceBadge } from "@internal/ui-library";

import type { FC, PropsWithChildren } from "react";


type BalanceCompositionFormulaProps = PropsWithChildren;

const BalanceCompositionFormula: FC<BalanceCompositionFormulaProps> = ({ children }) => (
	<FinanceBadge tone="pos" appearance="soft" dot>
		{children}
	</FinanceBadge>
);

BalanceCompositionFormula.displayName = 'BalanceCompositionFormula';

export { BalanceCompositionFormula };
export type { BalanceCompositionFormulaProps };

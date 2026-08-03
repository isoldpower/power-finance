import { FinanceBadge } from "@internal/ui-library";

import type { FC, ReactNode } from "react";


interface BalanceCompositionFormulaProps {
	children: ReactNode;
}

const BalanceCompositionFormula: FC<BalanceCompositionFormulaProps> = ({ children }) => {
	return (
		<FinanceBadge tone="pos" appearance="soft" dot>
			{children}
		</FinanceBadge>
	);
}

BalanceCompositionFormula.displayName = 'BalanceCompositionFormula';

export { BalanceCompositionFormula };

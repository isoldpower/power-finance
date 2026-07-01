import type { LedgerBalance } from "@feature/summary";
import {FC} from "react";
import {FinanceBadge} from "@internal/ui-library";


interface LedgerBalanceBadgeProps {
	ledger: LedgerBalance | undefined;
}

const LedgerBalanceBadge: FC<LedgerBalanceBadgeProps> = ({
	ledger
}) => {
	return ledger?.balanced
		? (
			<FinanceBadge tone="pos" appearance="soft" dot>balanced</FinanceBadge>
		)
		: (
			<FinanceBadge tone="neg" appearance="soft" dot>out-of-balance</FinanceBadge>
		);
}

export { LedgerBalanceBadge };
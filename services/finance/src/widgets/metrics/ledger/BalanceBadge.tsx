import type { LedgerBalance } from "@feature/metrics";
import { FinanceBadge } from "@internal/ui-library";

import type { FC } from "react";
import { BalanceBadgeFx } from "@feature/metrics";


interface LedgerBalanceBadgeProps {
	ledger: LedgerBalance | undefined;
	isPending: boolean;
}

const LedgerBalanceBadge: FC<LedgerBalanceBadgeProps> = ({
	isPending,
	ledger,
}) => {
	return (
		<BalanceBadgeFx isPending={isPending}>
			<FinanceBadge tone={ledger?.balanced ? "pos" : "neg"} appearance="soft" dot>
				{ledger?.balanced ? "balanced" : "out-of-balance"}
			</FinanceBadge>
		</BalanceBadgeFx>
	);
}

export { LedgerBalanceBadge };
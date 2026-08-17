import type { BalanceMetrics } from "@entity/metrics";
import { FinanceBadge } from "@internal/ui-library";

import type { FC } from "react";
import { BalanceBadgeFx } from "@feature/metrics";


interface BalanceMetricsBadgeProps {
	ledger: BalanceMetrics | undefined;
	isPending: boolean;
}

const BalanceMetricsBadge: FC<BalanceMetricsBadgeProps> = ({
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

export { BalanceMetricsBadge };
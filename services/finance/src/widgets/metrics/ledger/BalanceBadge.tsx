import { FinanceBadge } from "@internal/ui-library";
import { BalanceBadgeFx } from "@feature/metrics";

import type { BalanceMetrics } from "@entity/metrics";
import type { FC } from "react";


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
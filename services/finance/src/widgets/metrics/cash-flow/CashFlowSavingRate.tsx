import { ShowSavingRateTooltip } from "@feature/metrics";
import { MetricCardDescriptor, MetricCardIntext } from "@entity/metrics";

import type { FC } from "react";
import type { CashFlowInsight } from "@feature/metrics";


interface NetWorthSavingRateProps {
	cashFlow: CashFlowInsight;
}

const CashFlowSavingRate: FC<NetWorthSavingRateProps> = ({
	cashFlow,
}) => {
	return (
		<ShowSavingRateTooltip cashFlow={cashFlow}>
			<MetricCardDescriptor>
				Savings rate
				<MetricCardIntext tone={cashFlow.savingsRate >= 0 ? 'positive' : 'negative'}>
					&nbsp;{Math.round(cashFlow.savingsRate * 100)}%
				</MetricCardIntext>
			</MetricCardDescriptor>
		</ShowSavingRateTooltip>
	);
}

export { CashFlowSavingRate };
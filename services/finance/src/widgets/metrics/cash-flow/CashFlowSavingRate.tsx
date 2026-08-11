import { ShowSavingRateTooltip } from "@feature/metrics";
import { MetricCardDescriptor } from "@entity/metrics";
import { BodyText } from "@shared/pure-components/typography";

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
				<BodyText as="span" tone={cashFlow.savingsRate >= 0 ? 'positive' : 'negative'}>
					&nbsp;{Math.round(cashFlow.savingsRate * 100)}%
				</BodyText>
			</MetricCardDescriptor>
		</ShowSavingRateTooltip>
	);
}

export { CashFlowSavingRate };
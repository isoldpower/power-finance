import { ShowSavingRateTooltip } from "@feature/metrics";
import { MetricCardDescriptor, formatSavingsRate } from "@entity/metrics";
import { BodyText } from "@shared/pure-components/typography";

import type { FC } from "react";
import type { CashFlow } from "@entity/metrics";


interface NetWorthSavingRateProps {
	cashFlow: CashFlow;
}

const CashFlowSavingRate: FC<NetWorthSavingRateProps> = ({
	cashFlow,
}) => {
	const { savingsRate } = cashFlow;
	const tone = savingsRate !== null && savingsRate < 0 ? 'negative' : 'positive';

	return (
		<ShowSavingRateTooltip cashFlow={cashFlow}>
			<MetricCardDescriptor>
				Savings rate
				<BodyText as="span" tone={savingsRate === null ? 'muted' : tone}>
					&nbsp;{formatSavingsRate(savingsRate)}
				</BodyText>
			</MetricCardDescriptor>
		</ShowSavingRateTooltip>
	);
}

export { CashFlowSavingRate };

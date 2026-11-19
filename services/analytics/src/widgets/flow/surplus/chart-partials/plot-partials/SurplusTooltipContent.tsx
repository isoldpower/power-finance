import { ACCENT_COLOR, ChartTooltip, INFLOW_COLOR, OUTFLOW_COLOR } from "@shared/charts";
import { useAmountFormat, useDateFormat } from "@shared/formatting";
import { DotList } from "@shared/text";

import type { FC } from "react";
import type { Granularity } from "@entity/filters";
import type { CumulativePoint } from "@entity/flow";


interface SurplusTooltipContentProps {
	point: CumulativePoint;
	currency: string;
	granularity: Granularity;
}

const SurplusTooltipContent: FC<SurplusTooltipContentProps> = ({ point, currency, granularity }) => {
	const formatAmount = useAmountFormat(currency);
	const { formatBucket } = useDateFormat();
	const bucket = formatBucket(point.start, granularity);
	const difference = point.inflow - point.outflow;
	const balanceLabel = difference >= 0 ? 'Surplus' : 'Deficit';

	return (
		<>
			<ChartTooltip.Title>
				<DotList>
					Running total
					{bucket}
				</DotList>
			</ChartTooltip.Title>
			<ChartTooltip.Row color={INFLOW_COLOR} label="Earned">
				{formatAmount(point.inflow)}
			</ChartTooltip.Row>
			<ChartTooltip.Row color={OUTFLOW_COLOR} label="Spent">
				{formatAmount(point.outflow)}
			</ChartTooltip.Row>
			<ChartTooltip.Row color={ACCENT_COLOR} label={balanceLabel}>
				{formatAmount(Math.abs(difference))}
			</ChartTooltip.Row>
		</>
	);
};

SurplusTooltipContent.displayName = 'SurplusTooltipContent';

export { SurplusTooltipContent };
export type { SurplusTooltipContentProps };

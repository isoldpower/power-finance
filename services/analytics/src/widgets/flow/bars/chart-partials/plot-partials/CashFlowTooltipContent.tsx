import { ChartTooltip, INFLOW_COLOR, OUTFLOW_COLOR, ACCENT_COLOR } from "@shared/charts";
import { useAmountFormat, useDateFormat } from "@shared/formatting";

import type { FC } from "react";
import type { Granularity } from "@entity/filters";
import type { CashFlowPoint } from "@entity/flow";


interface CashFlowTooltipContentProps {
	point: CashFlowPoint;
	currency: string;
	granularity: Granularity;
}

const CashFlowTooltipContent: FC<CashFlowTooltipContentProps> = ({ point, currency, granularity }) => {
	const format = useAmountFormat(currency);
	const { formatBucket } = useDateFormat();
	const bucket = formatBucket(point.start, granularity);
	const title = granularity === 'week' ? `Week of ${bucket}` : bucket;

	return (
		<>
			<ChartTooltip.Title>
				{title}
			</ChartTooltip.Title>
			<ChartTooltip.Row color={INFLOW_COLOR} label="Income">
				{format(point.inflow)}
			</ChartTooltip.Row>
			<ChartTooltip.Row color={OUTFLOW_COLOR} label="Expenses">
				{format(point.outflow)}
			</ChartTooltip.Row>
			<ChartTooltip.Row color={ACCENT_COLOR} label="Net">
				{format(point.net)}
			</ChartTooltip.Row>
			<ChartTooltip.Row label="Transactions">
				{point.count.toString()}
			</ChartTooltip.Row>
		</>
	);
};

CashFlowTooltipContent.displayName = 'CashFlowTooltipContent';

export { CashFlowTooltipContent };
export type { CashFlowTooltipContentProps };

import { ACCENT_COLOR, ChartTooltip } from "@shared/charts";
import { useAmountFormat, useDateFormat } from "@shared/formatting";
import { DotList } from "@shared/text";

import type { FC } from "react";
import type { CashFlowPoint } from "@entity/flow";


interface BalanceTooltipContentProps {
	point: CashFlowPoint;
	currency: string;
}

const BalanceTooltipContent: FC<BalanceTooltipContentProps> = ({ point, currency }) => {
	const formatAmount = useAmountFormat(currency);
	const { formatBucket } = useDateFormat();
	const day = formatBucket(point.end, 'day');
	const balance = formatAmount(point.balance);
	const net = formatAmount(point.net);

	return (
		<>
			<ChartTooltip.Title>
				<DotList>
					Balance
					{day}
				</DotList>
			</ChartTooltip.Title>
			<ChartTooltip.Row color={ACCENT_COLOR} label="Closing balance">
				{balance}
			</ChartTooltip.Row>
			<ChartTooltip.Row label="Net this period">
				{net}
			</ChartTooltip.Row>
		</>
	);
};

BalanceTooltipContent.displayName = 'BalanceTooltipContent';

export { BalanceTooltipContent };
export type { BalanceTooltipContentProps };

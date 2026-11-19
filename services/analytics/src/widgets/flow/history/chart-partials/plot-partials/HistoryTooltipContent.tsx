import { ShowOnSeriesVisible } from "@feature/interactions";
import { ChartTooltip, TOTAL_INK } from "@shared/charts";
import { useAmountFormat, useDateFormat } from "@shared/formatting";

import type { FC } from "react";
import type { BalanceHistoryView, BalanceSeriesView } from "@entity/flow";


interface HistoryTooltipContentProps {
	index: number;
	view: BalanceHistoryView;
	visibleWallets: BalanceSeriesView[];
	showTotal: boolean;
	currency: string;
}

const HistoryTooltipContent: FC<HistoryTooltipContentProps> = ({
	index,
	view,
	visibleWallets,
	showTotal,
	currency,
}) => {
	const formatAmount = useAmountFormat(currency);
	const { formatBucket } = useDateFormat();
	const day = formatBucket(view.timestamps[index], 'day');

	return (
		<>
			<ChartTooltip.Title>
				{day}
			</ChartTooltip.Title>
			<ShowOnSeriesVisible visible={showTotal}>
				<ChartTooltip.Row color={TOTAL_INK} label="All wallets">
					{formatAmount(view.total[index])}
				</ChartTooltip.Row>
			</ShowOnSeriesVisible>
			{visibleWallets.map((series) => (
				<ChartTooltip.Row
					key={series.key}
					color={series.wallet.color}
					label={series.wallet.name}
				>
					{formatAmount(series.values[index])}
				</ChartTooltip.Row>
			))}
		</>
	);
};

HistoryTooltipContent.displayName = 'HistoryTooltipContent';

export { HistoryTooltipContent };
export type { HistoryTooltipContentProps };

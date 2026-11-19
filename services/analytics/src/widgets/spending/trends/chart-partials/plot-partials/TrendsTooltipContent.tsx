import { ShowOnPresent } from "@feature/interactions";
import { ChartTooltip, TOTAL_INK } from "@shared/charts";
import { useAmountFormat, useDateFormat } from "@shared/formatting";

import type { FC } from "react";
import type { Granularity } from "@entity/filters";
import type { TrendLayer, TrendRow } from "@entity/spending";


interface TrendsTooltipContentProps {
	row: TrendRow;
	layers: TrendLayer[];
	trend: number[] | null;
	colorOf: (key: string) => string;
	currency: string;
	granularity: Granularity;
}

const TrendsTooltipContent: FC<TrendsTooltipContentProps> = ({
	row,
	layers,
	trend,
	colorOf,
	currency,
	granularity,
}) => {
	const formatAmount = useAmountFormat(currency);
	const { formatBucket } = useDateFormat();
	const bucket = formatBucket(row.start, granularity);

	return (
		<>
			<ChartTooltip.Title>
				{bucket}
			</ChartTooltip.Title>
			{layers.map((layer) => {
				const amount = row.values[layer.key] ?? 0;

				return (
					<ChartTooltip.Row
						key={layer.key}
						color={colorOf(layer.key)}
						label={layer.label}
					>
						{formatAmount(amount)}
					</ChartTooltip.Row>
				);
			})}
			<ShowOnPresent value={trend}>
				{(values) => (
					<ChartTooltip.Row color={TOTAL_INK} label="Trend">
						{formatAmount(values[row.index])}
					</ChartTooltip.Row>
				)}
			</ShowOnPresent>
		</>
	);
};

TrendsTooltipContent.displayName = 'TrendsTooltipContent';

export { TrendsTooltipContent };
export type { TrendsTooltipContentProps };

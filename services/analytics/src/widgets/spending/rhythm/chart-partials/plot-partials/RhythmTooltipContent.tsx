import { hourRangeLabel, weekdayLabel } from "@entity/spending";
import { ChartTooltip } from "@shared/charts";
import { useAmountFormat } from "@shared/formatting";
import { DotList } from "@shared/text";

import type { FC } from "react";
import type { HoveredRhythmCell } from "@feature/spending";


interface RhythmTooltipContentProps {
	cell: HoveredRhythmCell;
	color: string;
	currency: string;
}

const RhythmTooltipContent: FC<RhythmTooltipContentProps> = ({ cell, color, currency }) => {
	const formatAmount = useAmountFormat(currency);

	return (
		<>
			<ChartTooltip.Title>
				<DotList>
					{weekdayLabel(cell.weekday)}
					{hourRangeLabel(cell.hour)}
				</DotList>
			</ChartTooltip.Title>
			<ChartTooltip.Row color={color} label="Amount">
				{formatAmount(cell.bin.count)}
			</ChartTooltip.Row>
			<ChartTooltip.Row label="Transactions">
				{cell.bin.transactions.toString()}
			</ChartTooltip.Row>
		</>
	);
};

RhythmTooltipContent.displayName = 'RhythmTooltipContent';

export { RhythmTooltipContent };
export type { RhythmTooltipContentProps };

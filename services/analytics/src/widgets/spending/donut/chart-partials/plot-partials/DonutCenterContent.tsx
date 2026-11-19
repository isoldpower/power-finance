import { DonutCenter, donutCenterText } from "@entity/spending";
import { useAmountFormat } from "@shared/formatting";

import type { FC } from "react";
import type { BreakdownSlice } from "@entity/spending";


interface DonutCenterContentProps {
	active: BreakdownSlice | undefined;
	totalLabel: string;
	total: number;
	categoryCount: number;
	currency: string;
}

const DonutCenterContent: FC<DonutCenterContentProps> = ({ active, totalLabel, total, categoryCount, currency }) => {
	const formatAmount = useAmountFormat(currency);
	const text = donutCenterText(active, { totalLabel, total, categoryCount });

	return (
		<DonutCenter>
			<DonutCenter.Label>
				{text.label}
			</DonutCenter.Label>
			<DonutCenter.Value>
				{formatAmount(text.value)}
			</DonutCenter.Value>
			<DonutCenter.Caption>
				{text.caption}
			</DonutCenter.Caption>
		</DonutCenter>
	);
};

DonutCenterContent.displayName = 'DonutCenterContent';

export { DonutCenterContent };
export type { DonutCenterContentProps };

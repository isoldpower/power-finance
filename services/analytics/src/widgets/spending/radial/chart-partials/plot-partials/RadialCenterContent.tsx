import { DonutCenter } from "@entity/spending";
import { formatPercent, useAmountFormat } from "@shared/formatting";

import type { FC } from "react";
import type { BreakdownSlice } from "@entity/spending";


interface RadialCenterContentProps {
	slice: BreakdownSlice;
	currency: string;
}

const RadialCenterContent: FC<RadialCenterContentProps> = ({ slice, currency }) => {
	const formatAmount = useAmountFormat(currency);

	return (
		<DonutCenter>
			<DonutCenter.Label>
				{slice.label}
			</DonutCenter.Label>
			<DonutCenter.Value>
				{formatPercent(slice.share)}
			</DonutCenter.Value>
			<DonutCenter.Caption>
				{formatAmount(slice.value)}
			</DonutCenter.Caption>
		</DonutCenter>
	);
};

RadialCenterContent.displayName = 'RadialCenterContent';

export { RadialCenterContent };
export type { RadialCenterContentProps };

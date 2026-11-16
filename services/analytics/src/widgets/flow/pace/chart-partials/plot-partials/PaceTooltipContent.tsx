import { useCallback } from "react";
import { ChartTooltip, MUTED_INK, OUTFLOW_COLOR } from "@shared/charts";
import { useAmountFormat, useDateFormat } from "@shared/formatting";
import { MISSING_VALUE } from "./config.ts";

import type { FC } from "react";
import type { Granularity } from "@entity/filters";
import type { PacePoint } from "@entity/flow";


interface PaceTooltipContentProps {
	point: PacePoint;
	currency: string;
	granularity: Granularity;
}

const PaceTooltipContent: FC<PaceTooltipContentProps> = ({ point, currency, granularity }) => {
	const formatAmount = useAmountFormat(currency);
	const { formatBucket } = useDateFormat();
	const format = useCallback((value: number | null) => {
		return value === null ? MISSING_VALUE : formatAmount(value);
	}, [formatAmount]);
	const bucket = formatBucket(point.start, granularity);

	return (
		<>
			<ChartTooltip.Title>
				{`Spent by ${bucket}`}
			</ChartTooltip.Title>
			<ChartTooltip.Row color={OUTFLOW_COLOR} label="This period">
				{format(point.current)}
			</ChartTooltip.Row>
			<ChartTooltip.Row color={MUTED_INK} label="Previous period">
				{format(point.previous)}
			</ChartTooltip.Row>
		</>
	);
};

PaceTooltipContent.displayName = 'PaceTooltipContent';

export { PaceTooltipContent };
export type { PaceTooltipContentProps };

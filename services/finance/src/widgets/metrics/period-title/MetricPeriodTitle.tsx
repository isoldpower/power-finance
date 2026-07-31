import { MetricCardTitle, rangeCodeToRelativeVerbose, rangeVerbose } from "@entity/metrics";

import type { FC } from "react";


interface MetricPeriodTitleProps {
	label: string;
	period: string;
	relative?: boolean;
}

const MetricPeriodTitle: FC<MetricPeriodTitleProps> = ({ label, period, relative = false }) => {
	const periodLabel = relative ? rangeCodeToRelativeVerbose(period) : rangeVerbose(period);

	return (
		<MetricCardTitle>
			{label} · {periodLabel}
		</MetricCardTitle>
	);
};

MetricPeriodTitle.displayName = 'MetricPeriodTitle';

export { MetricPeriodTitle };
export type { MetricPeriodTitleProps };

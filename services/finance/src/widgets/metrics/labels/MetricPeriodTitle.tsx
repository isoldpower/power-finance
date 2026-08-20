import { useMemo } from "react";
import { Overline } from "@shared/pure-components/typography";
import { rangeCodeToRelativeVerbose, rangeVerbose } from "@entity/metrics";

import type { FC } from "react";


interface MetricPeriodTitleProps {
	label: string;
	period: string;
	relative?: boolean;
}

const MetricPeriodTitle: FC<MetricPeriodTitleProps> = ({ label, period, relative = false }) => {
	const periodLabel = useMemo(() => {
		return relative 
			? rangeCodeToRelativeVerbose(period) 
			: rangeVerbose(period);
	}, [period, relative])

	return (
		<Overline as="h2" tracking="0.14em">
			{label} · {periodLabel}
		</Overline>
	);
};

MetricPeriodTitle.displayName = 'MetricPeriodTitle';

export { MetricPeriodTitle };
export type { MetricPeriodTitleProps };

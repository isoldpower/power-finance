import { useMemo } from "react";
import { toCumulativeSeries } from "@entity/flow";
import { ChartFrame } from "@shared/charts";
import { SurplusPlot } from "./chart-partials/SurplusPlot.tsx";

import type { FC } from "react";
import type { CashFlow, SurplusMode } from "@entity/flow";


interface SurplusChartProps {
	cashFlow: CashFlow;
	mode: SurplusMode;
	height?: number;
}

const SurplusChart: FC<SurplusChartProps> = ({ cashFlow, mode, height = 280 }) => {
	const points = useMemo(() => toCumulativeSeries(cashFlow), [cashFlow]);

	return (
		<ChartFrame height={height} label="Cumulative income against cumulative expenses">
			{({ width }) => (
				<SurplusPlot
					points={points}
					width={width}
					height={height}
					currency={cashFlow.totals.net.currency}
					granularity={cashFlow.granularity}
					mode={mode}
				/>
			)}
		</ChartFrame>
	);
};

SurplusChart.displayName = 'SurplusChart';

export { SurplusChart };
export type { SurplusChartProps };

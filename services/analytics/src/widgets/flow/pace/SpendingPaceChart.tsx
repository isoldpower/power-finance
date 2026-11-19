import { useMemo } from "react";
import { toPaceSeries } from "@entity/flow";
import { ChartFrame } from "@shared/charts";
import { SpendingPacePlot } from "./chart-partials/SpendingPacePlot.tsx";

import type { FC } from "react";
import type { CashFlow } from "@entity/flow";


interface SpendingPaceChartProps {
	current: CashFlow;
	previous: CashFlow;
	height?: number;
}

const SpendingPaceChart: FC<SpendingPaceChartProps> = ({ current, previous, height = 240 }) => {
	const points = useMemo(() => toPaceSeries(current, previous), [current, previous]);

	return (
		<ChartFrame height={height} label="Cumulative spending compared with the previous period">
			{({ width }) => (
				<SpendingPacePlot
					points={points}
					width={width}
					height={height}
					currency={current.totals.outflow.currency}
					granularity={current.granularity}
				/>
			)}
		</ChartFrame>
	);
};

SpendingPaceChart.displayName = 'SpendingPaceChart';

export { SpendingPaceChart };
export type { SpendingPaceChartProps };

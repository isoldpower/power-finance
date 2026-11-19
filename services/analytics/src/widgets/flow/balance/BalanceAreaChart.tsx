import { useMemo } from "react";
import { toCashFlowSeries } from "@entity/flow";
import { ChartFrame } from "@shared/charts";
import { BalanceAreaPlot } from "./chart-partials/BalanceAreaPlot.tsx";

import type { FC } from "react";
import type { CashFlow } from "@entity/flow";


interface BalanceAreaChartProps {
	cashFlow: CashFlow;
	height?: number;
}

const BalanceAreaChart: FC<BalanceAreaChartProps> = ({ cashFlow, height = 300 }) => {
	const points = useMemo(() => toCashFlowSeries(cashFlow), [cashFlow]);

	return (
		<ChartFrame height={height} label="Closing balance per period">
			{({ width }) => (
				<BalanceAreaPlot
					points={points}
					width={width}
					height={height}
					currency={cashFlow.totals.net.currency}
					granularity={cashFlow.granularity}
				/>
			)}
		</ChartFrame>
	);
};

BalanceAreaChart.displayName = 'BalanceAreaChart';

export { BalanceAreaChart };
export type { BalanceAreaChartProps };

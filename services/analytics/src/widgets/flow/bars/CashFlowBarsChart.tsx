import { useCallback, useMemo } from "react";
import { toCashFlowSeries } from "@entity/flow";
import { ChartFrame } from "@shared/charts";
import { CashFlowBarsPlot } from "./chart-partials/CashFlowBarsPlot.tsx";

import type { FC } from "react";
import type { CashFlow, CashFlowBucket } from "@entity/flow";


interface CashFlowBarsChartProps {
	cashFlow: CashFlow;
	height?: number;
	onSelectBucket: (bucket: CashFlowBucket) => void;
}

const CashFlowBarsChart: FC<CashFlowBarsChartProps> = ({ cashFlow, height = 300, onSelectBucket }) => {
	const points = useMemo(() => toCashFlowSeries(cashFlow), [cashFlow]);
	const currency = cashFlow.totals.net.currency;

	const handleSelect = useCallback((index: number) => {
		onSelectBucket(cashFlow.buckets[index]);
	}, [cashFlow.buckets, onSelectBucket]);

	return (
		<ChartFrame height={height} label="Income and expenses per period">
			{({ width }) => (
				<CashFlowBarsPlot
					points={points}
					width={width}
					height={height}
					currency={currency}
					granularity={cashFlow.granularity}
					onSelect={handleSelect}
				/>
			)}
		</ChartFrame>
	);
};

CashFlowBarsChart.displayName = 'CashFlowBarsChart';

export { CashFlowBarsChart };
export type { CashFlowBarsChartProps };

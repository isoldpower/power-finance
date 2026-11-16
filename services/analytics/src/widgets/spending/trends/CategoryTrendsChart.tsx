import { useMemo } from "react";
import { toTrendsView } from "@entity/spending";
import { ChartFrame, ChartLegend, useSeriesVisibility } from "@shared/charts";
import { CategoryTrendsPlot } from "./chart-partials/CategoryTrendsPlot.tsx";

import type { FC } from "react";
import type { CategoryTrends, TrendLayer, TrendsMode } from "@entity/spending";


interface CategoryTrendsChartProps {
	trends: CategoryTrends;
	mode: TrendsMode;
	currency: string;
	colorOf: (key: string) => string;
	onSelect: (layer: TrendLayer) => void;
	height?: number;
}

const CategoryTrendsChart: FC<CategoryTrendsChartProps> = ({
	trends,
	mode,
	currency,
	colorOf,
	onSelect,
	height = 300,
}) => {
	const view = useMemo(() => toTrendsView(trends), [trends]);
	const visibility = useSeriesVisibility();

	return (
		<div className="flex flex-col gap-3">
			<ChartFrame height={height} label="Category spending over time">
				{({ width }) => (
					<CategoryTrendsPlot
						rows={view.rows}
						layers={view.layers}
						isVisible={visibility.isVisible}
						mode={mode}
						width={width}
						height={height}
						currency={currency}
						granularity={trends.granularity}
						colorOf={colorOf}
						focused={visibility.focused}
						onFocus={visibility.focus}
						onSelect={onSelect}
					/>
				)}
			</ChartFrame>
			<ChartLegend label="Categories">
				{view.layers.map((layer) => (
					<ChartLegend.Item
						key={layer.key}
						color={colorOf(layer.key)}
						label={layer.label}
						muted={!visibility.isVisible(layer.key)}
						onToggle={() => { visibility.toggle(layer.key); }}
						onHover={(hovered) => { visibility.focus(hovered ? layer.key : null); }}
					/>
				))}
			</ChartLegend>
		</div>
	);
};

CategoryTrendsChart.displayName = 'CategoryTrendsChart';

export { CategoryTrendsChart };
export type { CategoryTrendsChartProps };

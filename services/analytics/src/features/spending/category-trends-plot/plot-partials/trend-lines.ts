import type { TrendsMode } from "@entity/spending";
import type { SeriesPoint } from "@shared/charts";


interface TrendLineScales {
	x: (index: number) => number;
	y: (value: number) => number;
}

const toLine = (values: number[], scales: TrendLineScales): SeriesPoint[] => {
	return values.map((value, index) => ({ x: scales.x(index), y: scales.y(value) }));
};

const trendLines = (
	trend: number[] | null,
	centers: number[] | null,
	mode: TrendsMode,
	scales: TrendLineScales,
): SeriesPoint[][] => {
	if (!trend) {
		return [];
	}

	if (mode === 'stacked') {
		return [toLine(trend, scales)];
	}

	if (!centers) {
		return [];
	}

	const upperEdge = trend.map((value, index) => centers[index] + value / 2);
	const lowerEdge = trend.map((value, index) => centers[index] - value / 2);

	return [toLine(upperEdge, scales), toLine(lowerEdge, scales)];
};

export { trendLines };
export type { TrendLineScales };

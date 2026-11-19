import type { SurplusThresholdPoint } from "@entity/flow";
import type { SeriesPoint } from "@shared/charts";


interface SurplusLines {
	inflowLine: SeriesPoint[];
	outflowLine: SeriesPoint[];
	thresholdPoints: SurplusThresholdPoint[];
}

const toSurplusLines = (
	inflows: number[],
	outflows: number[],
	positions: number[],
	y: (value: number) => number,
): SurplusLines => {
	const inflowLine = inflows.map((value, index) => ({ x: positions[index], y: y(value) }));
	const outflowLine = outflows.map((value, index) => ({ x: positions[index], y: y(value) }));
	const thresholdPoints = inflowLine.map((point, index) => ({
		x: point.x,
		inflowY: point.y,
		outflowY: outflowLine[index].y,
	}));

	return { inflowLine, outflowLine, thresholdPoints };
};

export { toSurplusLines };
export type { SurplusLines };

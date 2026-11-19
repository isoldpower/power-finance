import type { PacePoint } from "@entity/flow";
import type { SeriesPoint } from "@shared/charts";


interface PaceLineScales {
	x: (index: number) => number;
	y: (value: number) => number;
}

type PaceValuePicker = (point: PacePoint) => number | null;

const toPaceLine = (points: PacePoint[], pick: PaceValuePicker, scales: PaceLineScales): SeriesPoint[] => {
	return points.flatMap((point) => {
		const value = pick(point);

		if (value === null) {
			return [];
		}

		return [{ x: scales.x(point.index), y: scales.y(value) }];
	});
};

export { toPaceLine };
export type { PaceLineScales, PaceValuePicker };

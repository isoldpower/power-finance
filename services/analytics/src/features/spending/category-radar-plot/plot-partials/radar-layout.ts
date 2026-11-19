import { LABEL_GAP } from "./config.ts";
import { radarPoint, radarPolygon, radarRings } from "./layout-partials/radar-geometry.ts";

import type { BreakdownSlice } from "@entity/spending";
import type { RadarPoint } from "./layout-partials/radar-geometry.ts";


interface RadarLayout {
	rings: string[];
	spokes: RadarPoint[];
	current: string;
	previous: string;
	labels: RadarPoint[];
}

const radarLayout = (slices: BreakdownSlice[], radius: number, progress: number): RadarLayout => {
	const count = slices.length;
	const values = slices.map((slice) => slice.value);
	const previousValues = slices.map((slice) => slice.previousValue);
	const max = Math.max(1, ...values, ...previousValues);
	const reach = radius * progress;
	const labelRadius = radius + LABEL_GAP;

	return {
		rings: radarRings(count, radius),
		spokes: slices.map((_, index) => radarPoint(index, count, radius)),
		current: radarPolygon(values, max, reach),
		previous: radarPolygon(previousValues, max, reach),
		labels: slices.map((_, index) => radarPoint(index, count, labelRadius)),
	};
};

export { radarLayout };
export type { RadarLayout };

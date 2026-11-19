import { Area } from "@visx/shape";
import { curveMonotoneX } from "@visx/curve";

import type { FC } from "react";
import type { SeriesPoint } from "@shared/charts";


interface SeriesAreaProps {
	points: SeriesPoint[];
	baseline: number;
	fill: string;
}

const SeriesArea: FC<SeriesAreaProps> = ({ points, baseline, fill }) => (
	<Area
		data={points}
		x={(point) => point.x}
		y0={baseline}
		y1={(point) => point.y}
		curve={curveMonotoneX}
		fill={fill}
		className="fx-fade"
		pointerEvents="none"
	/>
);

SeriesArea.displayName = 'SeriesArea';

export { SeriesArea };
export type { SeriesAreaProps };

import { LinePath } from "@visx/shape";
import { curveMonotoneX } from "@visx/curve";

import type { FC } from "react";


interface SeriesPoint {
	x: number;
	y: number;
}

interface SeriesLineProps {
	points: SeriesPoint[];
	color: string;
	dashed?: boolean;
	strokeWidth?: number;
	animated?: boolean;
}

const SeriesLine: FC<SeriesLineProps> = ({ points, color, dashed = false, strokeWidth = 2, animated = true }) => (
	<LinePath
		data={points}
		x={(point) => point.x}
		y={(point) => point.y}
		curve={curveMonotoneX}
		stroke={color}
		strokeWidth={strokeWidth}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeDasharray={dashed ? '5 5' : undefined}
		fill="none"
		pathLength={dashed || !animated ? undefined : 1}
		className={dashed || !animated ? 'fx-fade' : 'fx-draw'}
		pointerEvents="none"
	/>
);

SeriesLine.displayName = 'SeriesLine';

export { SeriesLine };
export type { SeriesPoint, SeriesLineProps };

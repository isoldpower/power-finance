import { Threshold } from "@visx/threshold";
import { curveMonotoneX } from "@visx/curve";

import type { FC } from "react";


interface SurplusThresholdPoint {
	x: number;
	inflowY: number;
	outflowY: number;
}

interface SurplusThresholdProps {
	id: string;
	points: SurplusThresholdPoint[];
	height: number;
	surplusColor: string;
	deficitColor: string;
}

const SurplusThreshold: FC<SurplusThresholdProps> = ({ id, points, height, surplusColor, deficitColor }) => (
	<Threshold<SurplusThresholdPoint>
		id={id}
		data={points}
		x={(point) => point.x}
		y0={(point) => point.inflowY}
		y1={(point) => point.outflowY}
		clipAboveTo={0}
		clipBelowTo={height}
		curve={curveMonotoneX}
		aboveAreaProps={{ fill: surplusColor, fillOpacity: 0.22, className: 'fx-fade' }}
		belowAreaProps={{ fill: deficitColor, fillOpacity: 0.22, className: 'fx-fade' }}
	/>
);

SurplusThreshold.displayName = 'SurplusThreshold';

export { SurplusThreshold };
export type { SurplusThresholdPoint, SurplusThresholdProps };

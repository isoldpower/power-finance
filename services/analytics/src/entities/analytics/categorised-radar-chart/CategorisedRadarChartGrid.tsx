import { Line, LineRadial } from "@visx/shape";
import { Point } from '@visx/point';
import type { FC } from "react";


interface CategorisedRadarChartGridProps {
	points: { x: number; y: number }[];
	webs: { angle: number }[];
	angleScale: (angle: number) => number;
	levels?: number;
	radius: number;
	color: string;
	data: {
		category: string;
		amount: number;
	}[];
}

const CategorisedRadarChartGrid: FC<CategorisedRadarChartGridProps> = ({
	points,
	webs,
	angleScale,
	radius,
	data,
	color,
	levels = 5
}) => {
	const zeroPoint = new Point({ x: 0, y: 0 });

	return (
		<>
			{Array.from({ length: levels }).map((_, i) => (
				<LineRadial
					key={`web-${i.toString()}`}
					data={webs}
					angle={(item) => angleScale(item.angle)}
					radius={((i + 1) * radius) / levels}
					fill="none"
					stroke={color}
					strokeWidth={2}
					strokeOpacity={0.8}
					strokeLinecap="round"
				/>
			))}
			{Array.from({ length: data.length }).map((_, i) => (
				<Line 
					key={`radar-line-${i.toString()}`} 
					from={zeroPoint} to={points[i]} 
					stroke={color}
				/>
			))}
		</>
	)
}

export { CategorisedRadarChartGrid };
export type { CategorisedRadarChartGridProps };
import type { FC } from "react"


interface CategorisedRadarChartPolygonProps {
	points: { x: number; y: number }[];
	color: string;
}

const CategorisedRadarChartPolygon: FC<CategorisedRadarChartPolygonProps> = ({ 
	points,
	color
}) => {
	return (
		<>
			<polygon
				points={points.map(({ x, y }) => `${x.toString()},${y.toString()}`).join(' ')}
				fill={color}
				fillOpacity={0.2}
				stroke={color}
				strokeWidth={1}
			/>
			{points.map((point, i) => (
				<circle 
					key={`radar-point-${i.toString()}`} 
					cx={point.x} 
					cy={point.y} 
					r={4} 
					fill={color} 
				/>
			))}
		</>
	);
}

CategorisedRadarChartPolygon.displayName = 'CategorisedRadarChartPolygon';

export { CategorisedRadarChartPolygon };
export type { CategorisedRadarChartPolygonProps };
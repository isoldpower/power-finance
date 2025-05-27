import type { FC } from "react";


interface CategorisedRadarChartLabelsProps {
	points: { x: number; y: number }[];
	data: {
		category: string;
		amount: number;
	}[];
}

const CategorisedRadarChartLabels: FC<CategorisedRadarChartLabelsProps> = ({
	points,
	data
}) => {
	return points.map((point, index) => (
		<text
			key={index}
			x={point.x}
			y={point.y}
			textAnchor="middle"
			fill='var(--color-foreground)'
			dominantBaseline="middle"
			fontSize={10}
		>
			{data[index].category}
		</text>
	))
}

export { CategorisedRadarChartLabels };
export type { CategorisedRadarChartLabelsProps };
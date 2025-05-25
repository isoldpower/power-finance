import { scaleRadial, scaleBand } from "@visx/scale";
import { Text } from '@visx/text';
import { useCallback } from "react";
import type { FC } from "react";


interface CategorisedRadialChartLabelProps {
	item: {
		category: string;
		amount: number;
	};
	xScale: ReturnType<typeof scaleBand<string>>;
	yScale: ReturnType<typeof scaleRadial<number>>;
	index: number;
}

const CategorisedRadialChartLabel: FC<CategorisedRadialChartLabelProps> = ({
	item,
	xScale,
	yScale
}) => {
	const startAngle = xScale(item.category) ?? 0;
	const midAngle = startAngle + xScale.bandwidth() / 2;

	const outerRadius = yScale(item.amount);
	const textRadius = outerRadius + 4;
	const textX = textRadius * Math.cos(midAngle - Math.PI / 2);
	const textY = textRadius * Math.sin(midAngle - Math.PI / 2);

	const toDegrees = useCallback((x: number) => {
		return (x * 180) / Math.PI;
	}, []);

	return (
		<Text
			x={textX}
			y={textY}
			dominantBaseline="end"
			textAnchor="middle"
			fontSize={10}
			fill='black'
			angle={toDegrees(midAngle)}
		>
			{item.category}
		</Text>
	)
}

export { CategorisedRadialChartLabel };
export type { CategorisedRadialChartLabelProps };
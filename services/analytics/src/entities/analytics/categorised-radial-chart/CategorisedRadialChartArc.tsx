import { Arc } from "@visx/shape";
import { scaleRadial, scaleBand } from "@visx/scale";
import type { FC } from "react";


interface CategorisedRadialChartArcProps {
	item: {
		category: string;
		amount: number;
	};
	xScale: ReturnType<typeof scaleBand<string>>;
	yScale: ReturnType<typeof scaleRadial<number>>;
	innerRadius: number;
	index: number;
	color?: string;
}

const CategorisedRadialChartArc: FC<CategorisedRadialChartArcProps> = ({
	item,
	xScale,
	yScale,
	innerRadius,
	index,
	color: barColor = `var(--chart-${(index % 5 + 1).toString()})`
}) => {
	const startAngle = xScale(item.category) ?? 0;
	const endAngle = startAngle + xScale.bandwidth();
	const outerRadius = yScale(item.amount);

	return (
		<Arc
			key={`bar-${item.category.toString()}`}
			cornerRadius={4}
			startAngle={startAngle}
			endAngle={endAngle}
			outerRadius={outerRadius}
			innerRadius={innerRadius}
			fill={barColor}
		/>
	)
}

export { CategorisedRadialChartArc };
export type { CategorisedRadialChartArcProps };
import { scaleOrdinal } from "@visx/scale";
import { PieArcDatum, ProvidedProps } from "@visx/shape/lib/shapes/Pie";
import { FC } from "react";


type CategorisedPieChartArcProps = PieArcDatum<{
    category: string;
    amount: number;
}> & {
	pie: ProvidedProps<{ category: string; amount: number; }>
	categories: string[];
	donutThickness: number;
};

const CategorisedPieChartArc: FC<CategorisedPieChartArcProps> = ({ 
	pie,
	categories,
	donutThickness,
	...arc
}) => {
	const [centroidX, centroidY] = pie.path.centroid(arc);
	const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.3;
	const pathId = `arcPath-${arc.data.category}`;

	const getCategoryColor = scaleOrdinal({
		domain: categories,
		range: Array.from({ length: categories.length }).map((_, index) => {
			return `var(--chart-${(index + 1).toString()})`
		})
	});

	return (
		<g key={arc.data.category}>
			<path
				id={pathId}
				d={pie.path(arc) ?? undefined} 
				fill={getCategoryColor(arc.data.category)} 
			/>
			{hasSpaceForLabel && <text
				fill="black"
				fontSize={9}
				pointerEvents="none"
				textAnchor="middle"
				startOffset='50%'
				dominantBaseline="bottom"
				style={{ transform: `translate(${(centroidX / 20).toString()}px, ${(centroidY / 20).toString()}px)` }}
			>
				<textPath 
					href={`#${pathId}`} 
					startOffset={`calc((50% - ${donutThickness.toString()}px) / 2 + 10px)`} 
					textAnchor="bottom"
					alignmentBaseline="central"
				>
					{arc.data.category}
				</textPath>
			</text>}
		</g>
	)
}

export { CategorisedPieChartArc };
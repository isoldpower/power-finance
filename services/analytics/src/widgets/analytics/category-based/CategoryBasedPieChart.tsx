import { useEffect, useMemo, useRef } from "react";
import { Pie } from '@visx/shape';
import { useState } from 'react';
import { useParentSize } from "@visx/responsive";
import type { FC } from "react";

import { CategorisedPieChartArc, CategorisedPieChartShell } from "@entity/analytics";
import { PieChartInteractions } from "@feature/analytics";
import { groupedData } from './dataMock';


const categories = Object.keys(groupedData);
const categoryDataset = Object.entries(groupedData).map(([category, amount]) => ({ category, amount }));

interface CategoryBasedPieChartProps {
	size?: number | string;
	margin?: { top: number; right: number; bottom: number; left: number };
	animate?: boolean;
	donutThickness?: number;
}

const CategoryBasedPieChart: FC<CategoryBasedPieChartProps> = ({
  size = '100%',
  margin: passedMargin,
  animate = true,
  donutThickness = 50,
}) => {
	const { width, height, parentRef } = useParentSize();
	const margin = useRef(passedMargin ?? { top: 20, right: 20, bottom: 20, left: 20 });
    const innerWidth = useMemo(() => width - margin.current.left - margin.current.right, [width]);
    const innerHeight = useMemo(() => height - margin.current.top - margin.current.bottom, [height]);
	const radius = useMemo(() => Math.min(innerWidth, innerHeight) / 2, [innerWidth, innerHeight]);

	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

	useEffect(() => {
		console.log("selectedCategory", selectedCategory, "hoveredCategory", hoveredCategory);
	}, [selectedCategory, hoveredCategory]);

	return (typeof size === 'number' && size < 10) ? null : (
		<div className="relative" style={{ height: size, width: size }} ref={parentRef}>
			<CategorisedPieChartShell
				width={width}
				height={height}
				margin={margin.current}
			>
				<Pie
					data={selectedCategory ? categoryDataset.filter(({ category }) => category === selectedCategory) : categoryDataset}
					pieValue={(item) => item.amount}
					outerRadius={radius}
					innerRadius={(item) => {
						const isHovered = !selectedCategory && item.data.category === hoveredCategory;
						return isHovered 
							? radius - donutThickness 
							: radius - donutThickness * 0.8;
					}}
					cornerRadius={3}
					padAngle={0.005}
				>
					{(pie) => pie.arcs.map((arc) => (
						<PieChartInteractions
							animate={animate}
							arc={arc}
							onHoverChange={setHoveredCategory}
							onSelectChange={setSelectedCategory}
							selectedCategory={selectedCategory}
						>
							<CategorisedPieChartArc
								pie={pie}
								categories={categories}
								donutThickness={donutThickness}
								{...arc}
							/>
						</PieChartInteractions>
					))}
				</Pie>
			</CategorisedPieChartShell>
		</div>
	);
}

CategoryBasedPieChart.displayName = 'CategoryBasedPieChart';

export { CategoryBasedPieChart };
export type { CategoryBasedPieChartProps };
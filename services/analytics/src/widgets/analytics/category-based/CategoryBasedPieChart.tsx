import { useMemo, useRef } from "react";
import { Pie } from '@visx/shape';
import { useState } from 'react';
import { useParentSize } from "@visx/responsive";
import type { FC } from "react";

import { CategorisedPieChartAccent, CategorisedPieChartArc, CategorisedPieChartShell } from "@entity/analytics";
import { CategoriesAnalyticsResponse, LoadingChartFx, PieChartInteractions } from "@feature/analytics";


const HOVER_THICKNESS_RATIO = 0.8;

interface CategoryBasedPieChartProps {
	size?: number | string;
	margin?: { top: number; right: number; bottom: number; left: number };
	animate?: boolean;
	donutThickness?: number;
	isLoading: boolean;
	data: CategoriesAnalyticsResponse;
}

const CategoryBasedPieChart: FC<CategoryBasedPieChartProps> = ({
	size = '100%',
	margin: passedMargin,
	animate = true,
	donutThickness = 50,
	isLoading,
	data
}) => {
	const { width, height, parentRef } = useParentSize();
	const margin = useRef(passedMargin ?? { top: 40, right: 40, bottom: 40, left: 40 });
    const innerWidth = useMemo(() => width - margin.current.left - margin.current.right, [width]);
    const innerHeight = useMemo(() => height - margin.current.top - margin.current.bottom, [height]);
	const radius = useMemo(() => Math.min(innerWidth, innerHeight) / 2, [innerWidth, innerHeight]);

	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

	return (typeof size === 'number' && size < 10) ? null : (
		<div className="relative mx-auto" style={{ height: size, width: size }} ref={parentRef}>
			<LoadingChartFx isLoading={isLoading}>
				<CategorisedPieChartShell
					width={width}
					height={height}
					margin={margin.current}
				>
					<Pie
						data={selectedCategory ? data.filter(({ category }) => category === selectedCategory) : data}
						pieValue={(item) => item.amount}
						outerRadius={radius}
						innerRadius={(item) => {
							const isHovered = !selectedCategory && item.data.category === hoveredCategory;
							return isHovered 
								? radius - donutThickness 
								: radius - donutThickness * HOVER_THICKNESS_RATIO;
						}}
						cornerRadius={3}
						padAngle={0.005}
					>
						{(pie) => pie.arcs.map((arc) => (
							<PieChartInteractions
								key={arc.index}
								animate={animate}
								arc={arc}
								onHoverChange={setHoveredCategory}
								onSelectChange={setSelectedCategory}
								selectedCategory={selectedCategory}
							>
								<CategorisedPieChartArc
									labeled={!selectedCategory}
									pie={pie}
									categories={data.map(({ category }) => category)}
									donutThickness={donutThickness}
									{...arc}
								/>
							</PieChartInteractions>
						))}
					</Pie>
					<CategorisedPieChartAccent
						selectedCategory={selectedCategory}
						hoverCategory={hoveredCategory}
						data={data}
					/>
				</CategorisedPieChartShell>
			</LoadingChartFx>
		</div>
	);
}

CategoryBasedPieChart.displayName = 'CategoryBasedPieChart';

export { CategoryBasedPieChart };
export type { CategoryBasedPieChartProps };
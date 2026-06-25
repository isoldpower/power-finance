import { useParentSize } from "@visx/responsive";
import { scaleBand, scaleRadial } from "@visx/scale";
import { useMemo, useRef, useState } from "react";
import type { FC } from "react";

import {
	CategorisedRadarChartShell,
	CategorisedRadialChartArc,
	CategorisedRadialChartCenter,
	CategorisedRadialChartLabel
} from "@entity/analytics";
import {
	RadialChartInteractions,
	LoadingChartFx,
	CategoriesAnalyticsResponse
} from "@feature/analytics";


const INNER_RADIUS_RATIO = 0.5;

interface CategoryBasedRadialChartProps {
	size: number;
	margin?: { top: number; left: number; right: number; bottom: number; };
	isLoading: boolean;
	data: CategoriesAnalyticsResponse;
}

const CategoryBasedRadialChart: FC<CategoryBasedRadialChartProps> = ({ 
	size,
	margin: passedMargin,
	isLoading,
	data
}) => {
	const { width, height, parentRef } = useParentSize();
	const margin = useRef(passedMargin ?? { top: 20, left: 20, right: 20, bottom: 20 });
	const innerWidth = useMemo(() => width - margin.current.left - margin.current.right, [width, margin]);
	const innerHeight = useMemo(() => height - margin.current.top - margin.current.bottom, [height, margin]);
	const radiusMax = Math.min(innerWidth, innerHeight) / 2;
	const innerRadius = radiusMax * INNER_RADIUS_RATIO;
	
	const [hoverCategory, setHoverCategory] = useState<string | null>(null);
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	const accentCategory = useMemo(() => {
		return selectedCategory ?? hoverCategory ?? null
	}, [hoverCategory, selectedCategory]);

	const xScale = useMemo(() => {
		return scaleBand<string>({
			range: [0, 2 * Math.PI],
			domain: data.map((item) => item.category),
			padding: 0.05,
		});
	}, [data]);
	
	  const yScale = useMemo(() => {
		return scaleRadial<number>({
			range: [innerRadius, radiusMax],
			domain: [0, Math.max(...data.map((item) => item.amount))],
		});
	}, [data, innerRadius, radiusMax]);

	return (size < 10) ? null : (
		<div className="relative mx-auto" style={{ height: size, width: size }} ref={parentRef}>
			<LoadingChartFx isLoading={isLoading}>
				<CategorisedRadarChartShell width={width} height={height} margin={margin.current}>
					{data.map((item, index) => (
						<RadialChartInteractions 
							key={item.category}
							category={item.category}
							selectedCategory={selectedCategory}
							onHoverChange={setHoverCategory}
							onSelectChange={setSelectedCategory}
						>
							HELLO WORLD
							<CategorisedRadialChartArc
								item={item}
								xScale={xScale}
								yScale={yScale}
								innerRadius={hoverCategory === item.category ? innerRadius - 8 : innerRadius}
								index={index}
							/>
							<CategorisedRadialChartLabel
								item={item}
								xScale={xScale}
								yScale={yScale}
								index={index}
							/>
							{selectedCategory === item.category ? (
								<g className="pointer-events-none z-10" opacity={0.05}>
									<CategorisedRadialChartArc
										item={{ 
											category: item.category,
											amount: Math.max(...data.map((item) => item.amount)) * 10
										}}
										xScale={xScale}
										yScale={yScale}
										innerRadius={hoverCategory === item.category ? innerRadius - 8 : innerRadius}
										index={index}
										color="var(--color-foreground)"
									/>
								</g>
							) : null}
						</RadialChartInteractions>
					))}
					<CategorisedRadialChartCenter 
						accentCategory={accentCategory}
						data={data} 
					/>
				</CategorisedRadarChartShell>
			</LoadingChartFx>
		</div>
	)
}

export { CategoryBasedRadialChart };
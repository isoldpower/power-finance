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
import { RadialChartInteractions } from "@feature/analytics";
import { flatGroupedData } from "./dataMock";


const INNER_RADIUS_RATIO = 0.5;

interface CategoryBasedRadialChartProps {
	size: number;
	margin?: { top: number; left: number; right: number; bottom: number; };
}

const CategoryBasedRadialChart: FC<CategoryBasedRadialChartProps> = ({ 
	size,
	margin: passedMargin
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
			domain: flatGroupedData.map((item) => item.category),
			padding: 0.05,
		});
	}, []);
	
	  const yScale = useMemo(() => {
		return scaleRadial<number>({
			range: [innerRadius, radiusMax],
			domain: [0, Math.max(...flatGroupedData.map((item) => item.amount))],
		});
	}, [innerRadius, radiusMax]);

	return (typeof size === 'number' && size < 10) ? null : (
		<div className="relative mx-auto" style={{ height: size, width: size }} ref={parentRef}>
			<CategorisedRadarChartShell width={width} height={height} margin={margin.current}>
				{flatGroupedData.map((item, index) => (
					<RadialChartInteractions 
						key={item.category}
						category={item.category}
						selectedCategory={selectedCategory}
						onHoverChange={setHoverCategory}
						onSelectChange={setSelectedCategory}
					>
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
										amount: Math.max(...flatGroupedData.map((item) => item.amount)) * 10
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
					data={flatGroupedData} 
				/>
			</CategorisedRadarChartShell>
		</div>
	)
}

export { CategoryBasedRadialChart };
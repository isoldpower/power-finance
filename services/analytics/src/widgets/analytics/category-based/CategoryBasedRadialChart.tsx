import { useParentSize } from "@visx/responsive";
import { scaleBand, scaleRadial } from "@visx/scale";
import { useMemo, useRef } from "react";
import type { FC } from "react";

import { CategorisedRadarChartShell, CategorisedRadialChartArc, CategorisedRadialChartLabel } from "@entity/analytics";
import { flatGroupedData } from "./dataMock";


const INNER_RADIUS_RATIO = 0.25;

interface CategoryBasedRadialChartProps {
	size: number;
	margin?: { top: number; left: number; right: number; bottom: number; };
}

const CategoryBasedRadialChart: FC<CategoryBasedRadialChartProps> = ({ 
	size,
	margin: passedMargin
}) => {
	const { width, height, parentRef } = useParentSize();
	const margin = useRef(passedMargin ?? { top: 20, left: 40, right: 40, bottom: 20 });
	const innerWidth = useMemo(() => width - margin.current.left - margin.current.right, [width, margin]);
	const innerHeight = useMemo(() => height - margin.current.top - margin.current.bottom, [height, margin]);

	const radiusMax = Math.min(innerWidth, innerHeight) / 2;
	const innerRadius = radiusMax * INNER_RADIUS_RATIO;

	const xScale = useMemo(() => {
		return scaleBand<string>({
			range: [0, 2 * Math.PI],
			domain: flatGroupedData.map((item) => item.category),
			padding: 0.2,
		});
	}, []);
	
	  const yScale = useMemo(() => {
		return scaleRadial<number>({
			range: [innerRadius, radiusMax],
			domain: [0, Math.max(...flatGroupedData.map((item) => item.amount))],
		});
	}, [innerRadius, radiusMax]);

	return (typeof size === 'number' && size < 10) ? null : (
		<div className="relative" style={{ height: size, width: size }} ref={parentRef}>
			<CategorisedRadarChartShell width={width} height={height} margin={margin.current}>
				{flatGroupedData.map((item, index) => (
					<>
						<CategorisedRadialChartArc
							item={item}
							xScale={xScale}
							yScale={yScale}
							innerRadius={innerRadius}
							index={index}
						/>
						<CategorisedRadialChartLabel
							item={item}
							xScale={xScale}
							yScale={yScale}
							index={index}
						/>
					</>
				))}
			</CategorisedRadarChartShell>
		</div>
	)
}

export { CategoryBasedRadialChart };
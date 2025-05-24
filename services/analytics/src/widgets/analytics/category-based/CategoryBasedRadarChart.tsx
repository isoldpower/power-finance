import { scaleLinear } from '@visx/scale';
import { useParentSize } from '@visx/responsive';
import { useMemo, useRef } from 'react';
import type { FC } from 'react';

import { groupedData } from './dataMock';
import { DEGREES, genAngles, genPoints, genPolygonPoints } from '@feature/analytics';
import {
	CategorisedRadarChartShell,
	CategorisedRadarChartGrid,
	CategorisedRadarChartPolygon
} from '@entity/analytics';


const data = Object.entries(groupedData).map(([key, value]) => ({ category: key, amount: value }));

interface CategoryBasedRadarChartProps {
  size: number | string;
  margin?: { top: number; right: number; bottom: number; left: number };
  levels?: number;
}

const CategoryBasedRadarChart: FC<CategoryBasedRadarChartProps> = ({ 
	size,
	levels = 5, 
	margin: passedMargin
}) => {
	const { width, height, parentRef } = useParentSize();
	const margin = useRef(passedMargin ?? { top: 20, left: 20, right: 20, bottom: 20 });
	const innerWidth = useMemo(() => width - margin.current.left - margin.current.right, [width, margin]);
	const innerHeight = useMemo(() => height - margin.current.top - margin.current.bottom, [height, margin]);
	const radius = useMemo(() => Math.min(innerWidth, innerHeight) / 2, [innerWidth, innerHeight]);

	const radialScale = scaleLinear<number>({
		range: [0, Math.PI * 2],
		domain: [DEGREES, 0],
	});

	const yScale = scaleLinear<number>({
		range: [0, radius],
		domain: [0, Math.max(...data.map(({ amount }) => amount))],
	});

	const polygonPoints = genPolygonPoints(
		data,
		(d) => yScale(d),
		(item) => item?.amount ?? 0
	);

	return (typeof size === 'number' && size < 10) ? null : (
		<div className="relative" style={{ height: size, width: size }} ref={parentRef}>
			<CategorisedRadarChartShell width={width} height={height} margin={margin.current}>
				<CategorisedRadarChartGrid
					points={genPoints(data.length, radius)}
					webs={genAngles(data.length)}
					angleScale={radialScale}
					radius={radius}
					data={data}
					levels={levels}
					color='var(--color-border)'
				/>
				<CategorisedRadarChartPolygon
					points={polygonPoints}
					color='var(--color-chart-1)'
				/>
			</CategorisedRadarChartShell>
		</div>
	);
}

CategoryBasedRadarChart.displayName = 'CategoryBasedRadarChart';

export { CategoryBasedRadarChart };
export type { CategoryBasedRadarChartProps };
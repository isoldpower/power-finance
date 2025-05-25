import { scaleLinear } from '@visx/scale';
import { useParentSize } from '@visx/responsive';
import { useMemo, useRef } from 'react';
import type { FC } from 'react';

import { flatGroupedData } from './dataMock';
import { DEGREES, genAngles, genPoints, genPolygonPoints } from '@feature/analytics';
import {
	CategorisedRadarChartShell,
	CategorisedRadarChartGrid,
	CategorisedRadarChartPolygon,
	CategorisedRadarChartLabels
} from '@entity/analytics';


const LABELS_OFFSET = { x: 10, y: 20 };

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
	const margin = useRef(passedMargin ?? { top: 0, left: 40, right: 40, bottom: 0 });
	const innerWidth = useMemo(() => width - margin.current.left - margin.current.right, [width, margin]);
	const innerHeight = useMemo(() => height - margin.current.top - margin.current.bottom, [height, margin]);
	const radius = useMemo(() => Math.min(innerWidth, innerHeight) / 2, [innerWidth, innerHeight]);

	const radialScale = scaleLinear<number>({
		range: [0, Math.PI * 2],
		domain: [DEGREES, 0],
	});

	const yScale = scaleLinear<number>({
		range: [0, radius],
		domain: [0, Math.max(...flatGroupedData.map(({ amount }) => amount))],
	});

	const polygonPoints = genPolygonPoints(
		flatGroupedData,
		(d) => yScale(d),
		(item) => item?.amount ?? 0
	);

	return (typeof size === 'number' && size < 10) ? null : (
		<div className="relative mx-auto" style={{ height: size, width: size }} ref={parentRef}>
			<CategorisedRadarChartShell width={width} height={height} margin={margin.current}>
				<CategorisedRadarChartGrid
					points={genPoints(flatGroupedData.length, radius)}
					webs={genAngles(flatGroupedData.length)}
					angleScale={radialScale}
					radius={radius}
					data={flatGroupedData}
					levels={levels}
					color='var(--color-border)'
				/>
				<CategorisedRadarChartPolygon
					points={polygonPoints}
					color='var(--color-chart-1)'
				/>
				<CategorisedRadarChartLabels
					points={genPoints(flatGroupedData.length, radius, LABELS_OFFSET)}
					data={flatGroupedData}
				/>
			</CategorisedRadarChartShell>
		</div>
	);
}

CategoryBasedRadarChart.displayName = 'CategoryBasedRadarChart';

export { CategoryBasedRadarChart };
export type { CategoryBasedRadarChartProps };
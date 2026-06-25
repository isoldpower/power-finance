import { scaleLinear } from '@visx/scale';
import { useParentSize } from '@visx/responsive';
import { useMemo, useRef } from 'react';
import type { FC } from 'react';

import {
	CategoriesAnalyticsResponse,
	DEGREES,
	genAngles,
	genPoints,
	genPolygonPoints
} from '@feature/analytics';
import {
	CategorisedRadarChartShell,
	CategorisedRadarChartGrid,
	CategorisedRadarChartPolygon,
	CategorisedRadarChartLabels,
	CategorisedRadarChartTooltip
} from '@entity/analytics';
import { useTooltip } from '@visx/tooltip';
import { RadarChartTooltipOverlay, ShowRadarChartTooltip, LoadingChartFx } from '@feature/analytics';
import type { CategorisedDataPiece } from '@entity/analytics/model';


const LABELS_OFFSET = { x: 10, y: 20 };

interface CategoryBasedRadarChartProps {
	size: number | string;
	margin?: { top: number; right: number; bottom: number; left: number };
	levels?: number;
	isLoading: boolean;
	data: CategoriesAnalyticsResponse;
}

const CategoryBasedRadarChart: FC<CategoryBasedRadarChartProps> = ({ 
	size,
	levels = 5, 
	margin: passedMargin,
	data,
	isLoading
}) => {
	const { width, height, parentRef } = useParentSize();
	const tooltip = useTooltip<CategorisedDataPiece>();

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
		domain: [0, Math.max(...data.map(({ amount }) => amount))],
	});

	const polygonPoints = genPolygonPoints(
		data,
		(d) => yScale(d),
		(item) => item?.amount ?? 0
	);
	
	return (typeof size === 'number' && size < 10) ? null : (
		<div className="relative mx-auto" style={{ height: size, width: size }} ref={parentRef}>
			<LoadingChartFx isLoading={isLoading}>
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
					<CategorisedRadarChartLabels
						points={genPoints(data.length, radius, LABELS_OFFSET)}
						data={data}
					/>
					<RadarChartTooltipOverlay
						data={data}
						points={polygonPoints}
						tooltip={tooltip}
						width={width}
						height={height}
					>
						<circle
							className='pointer-events-none'
							cx={tooltip.tooltipLeft ?? 0}
							cy={tooltip.tooltipTop ?? 0}
							r={6}
							fill='var(--chart-1)'
						/>
					</RadarChartTooltipOverlay>
				</CategorisedRadarChartShell>
				<ShowRadarChartTooltip height={innerHeight} width={innerWidth} {...tooltip}>
					<CategorisedRadarChartTooltip tooltipData={tooltip.tooltipData} />
				</ShowRadarChartTooltip>
			</LoadingChartFx>
		</div>
	);
}

CategoryBasedRadarChart.displayName = 'CategoryBasedRadarChart';

export { CategoryBasedRadarChart };
export type { CategoryBasedRadarChartProps };
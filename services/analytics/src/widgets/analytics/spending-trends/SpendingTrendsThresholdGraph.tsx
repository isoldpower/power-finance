import { useMemo, useRef, type FC } from 'react';
import { scaleTime, scaleLinear } from '@visx/scale';
import { useParentSize } from '@visx/responsive';
import { useTooltip } from '@visx/tooltip';
import { curveBasis } from '@visx/curve';
import { Threshold } from '@visx/threshold';

import { data } from './dataMock';
import {
	GridChartContainer,
	GridChartLegend,
	GridChartSkeleton,
	GridChartThresholdOverlay,
	GridChartThresholdPath,
	GridChartThresholdTooltip
} from '@entity/analytics';
import { HoverTooltipOverlay, ShowHoverTooltip } from '@feature/analytics';
import type { SpendingDataFlat } from '@entity/analytics/model';


interface SpendingTrendsThresholdGraphProps {
  height?: number;
  margin?: { top: number; right: number; bottom: number; left: number };
}

const SpendingTrendsThresholdGraph: FC<SpendingTrendsThresholdGraphProps> = ({ 
  height: targetHeight = 400,
}) => {
  	const { width, height, parentRef } = useParentSize();
	const dataset = useMemo<SpendingDataFlat[]>(() => {
		return Object.entries(data)
			.map(([key, value]) => ({ date: new Date(key).getTime(), ...value }));
    }, []);
	const margin = useRef({ top: 0, right: 10, bottom: 30, left: 60 });
	const innerWidth = useMemo(() => width - margin.current.left - margin.current.right, [width]);
	const innerHeight = useMemo(() => height - margin.current.top - margin.current.bottom, [height]);
	
	const tooltip = useTooltip<SpendingDataFlat>();

	const dateScale = useMemo(() => {
		const dates = Object.keys(data).map((key) => new Date(key));
		return scaleTime({
			range: [0, innerWidth],
			domain: [dates[0], dates[dates.length - 1]],
		});
	}, [innerWidth]);

	const valueScale = useMemo(() => {
		const dataset = Object.values(data);
		return scaleLinear({
			range: [innerHeight, 0],
			domain: [0, Math.max(...dataset.map((part) => Math.max(part.income, part.expenses))) * 1.1],
			nice: true,
		});
	}, [innerHeight]);

  	return (
		<div className="relative pb-4" style={{ height: targetHeight }} ref={parentRef}>
			<GridChartContainer width={width} height={height} margin={margin.current}>
				<GridChartSkeleton
					horizontalScale={dateScale}
					verticalScale={valueScale}
					width={innerWidth}
					height={innerHeight}
				/>
				<Threshold<SpendingDataFlat>
					id={Math.random().toString()}
					data={dataset}
					x={(d: SpendingDataFlat) => dateScale(new Date(d.date))}
					y0={(d: SpendingDataFlat) => valueScale(d.expenses)}
					y1={(d: SpendingDataFlat) => valueScale(d.income)}
					clipAboveTo={0}
					clipBelowTo={innerHeight}
					curve={curveBasis}
					belowAreaProps={{
						fill: 'var(--chart-1)',
						fillOpacity: 0.2,
					}}
					aboveAreaProps={{
						fill: 'var(--chart-2)',
						fillOpacity: 0.2,
					}} />
					<GridChartThresholdPath
						data={dataset}
						xAccessor={(d) => dateScale(d.date)}
						yAccessor={(d) => valueScale(d.expenses)}
					/>
					<GridChartThresholdPath
						data={dataset}
						xAccessor={(d) => dateScale(d.date)}
						yAccessor={(d) => valueScale(d.income)}
					/>
					<HoverTooltipOverlay
						width={innerWidth}
						height={innerHeight}
						horizontalScale={dateScale}
						dataset={dataset}
						margin={margin.current}
						tooltip={tooltip}
						computePosition={(item, point) => ({
							tooltipTop: point.y - 40,
							tooltipLeft: dateScale(item.date)
						})}
					>
						<GridChartThresholdOverlay
							tooltipLeft={tooltip.tooltipLeft}
							tooltipData={tooltip.tooltipData}
							height={innerHeight}
						/>
					</HoverTooltipOverlay>
			</GridChartContainer>
			<ShowHoverTooltip {...tooltip}>
				<GridChartThresholdTooltip tooltipData={tooltip.tooltipData} />
			</ShowHoverTooltip>
			<div className="absolute left-0 right-0 bottom-0">
				<GridChartLegend
					entries={[
						{ color: 'var(--chart-2)', label: 'Positive' },
						{ color: 'var(--chart-1)', label: 'Negative' },
					]} />
			</div>
		</div>
  	);
};

SpendingTrendsThresholdGraph.displayName = 'SpendingTrendsThresholdGraph';

export { SpendingTrendsThresholdGraph };
export type { SpendingTrendsThresholdGraphProps };
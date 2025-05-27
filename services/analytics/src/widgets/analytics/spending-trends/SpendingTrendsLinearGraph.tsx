import { FC, useMemo, useRef } from "react";
import { curveMonotoneX } from '@visx/curve';
import { scaleLinear, scaleTime } from "@visx/scale";
import { useTooltip } from "@visx/tooltip";
import { useParentSize } from "@visx/responsive";

import { data } from "./dataMock";
import { GridChartSkeleton, GridChartLinearPath, GridChartContainer, GridChartLegend, GridChartLinearTooltip, GridChartLinearOverlay } from "@entity/analytics";
import { HoverTooltipOverlay, ShowHoverTooltip } from "@feature/analytics";
import type { SpendingDataFlat } from "@entity/analytics/model";


interface SpendingTrendsLinearGraphProps {
    height?: number;
}

const SpendingTrendsLinearGraph: FC<SpendingTrendsLinearGraphProps> = ({
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
		<div className="relative pb-6" style={{ height: targetHeight }} ref={parentRef}>
			<GridChartContainer width={width} height={height} margin={margin.current}>
				<GridChartSkeleton
					horizontalScale={dateScale}
					verticalScale={valueScale}
					width={innerWidth}
					height={innerHeight}
				/>
				<GridChartLinearPath
					color='var(--chart-1)'
					xAccessor={(d: { key: string, value: number }) => dateScale(new Date(d.key))}
					yAccessor={(d: { key: string, value: number }) => valueScale(d.value)}
					yScale={valueScale}
					curve={curveMonotoneX}
					data={Object.entries(data).map(([date, value]) => ({ key: date, value: value.expenses }))}
					title='expenses'
				/>
				<GridChartLinearPath
					color='var(--chart-2)'
					xAccessor={(d: { key: string, value: number }) => dateScale(new Date(d.key))}
					yAccessor={(d: { key: string, value: number }) => valueScale(d.value)}
					yScale={valueScale}
					curve={curveMonotoneX}
					data={Object.entries(data).map(([date, value]) => ({ key: date, value: value.income }))}
					title='income'
				/>
				<HoverTooltipOverlay
					width={innerWidth}
					height={innerHeight}
					horizontalScale={dateScale}
					dataset={dataset}
					margin={margin.current}
					tooltip={tooltip}
					computePosition={(item) => ({
						tooltipTop: valueScale((item.income + item.expenses) / 2 + margin.current.top),
						tooltipLeft: dateScale(item.date)
					})}
				>
					<GridChartLinearOverlay
						tooltipLeft={tooltip.tooltipLeft}
						tooltipData={tooltip.tooltipData}
						verticalScale={valueScale}
						height={innerHeight}
					/>
				</HoverTooltipOverlay>
			</GridChartContainer>
			<ShowHoverTooltip {...tooltip}>
				<GridChartLinearTooltip tooltipData={tooltip.tooltipData} />
			</ShowHoverTooltip>
			<div className="absolute left-0 right-0 bottom-0">
				<GridChartLegend
					entries={[
						{ color: 'var(--chart-2)', label: 'Income' },
						{ color: 'var(--chart-1)', label: 'Expenses' },
					]} />
			</div>
		</div>
    );
};

SpendingTrendsLinearGraph.displayName = 'SpendingTrendsLinearGraph';

export { SpendingTrendsLinearGraph };
export type { SpendingTrendsLinearGraphProps };

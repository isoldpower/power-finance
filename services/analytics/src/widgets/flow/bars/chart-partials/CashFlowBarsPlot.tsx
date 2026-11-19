import { useCallback } from "react";
import { Group } from "@visx/group";
import { BarHighlight, ChartDot, ChartHitArea, FlowBar } from "@entity/flow";
import { FLOW_CHART_MARGIN, useCashFlowBarsPlot } from "@feature/flow";
import { ShowOnHover, ShowOnHoverAt } from "@feature/interactions";
import {
	ACCENT_COLOR,
	ChartAxisBottom,
	ChartAxisLeft,
	ChartGridRows,
	ChartTooltip,
	SeriesLine,
} from "@shared/charts";
import { useAmountTickFormat, useBucketTickFormat } from "@shared/formatting";
import { CashFlowTooltipContent } from "./plot-partials/CashFlowTooltipContent.tsx";
import { NET_LINE_WIDTH } from "./config.ts";

import type { FC } from "react";
import type { Granularity } from "@entity/filters";
import type { CashFlowPoint } from "@entity/flow";


interface CashFlowBarsPlotProps {
	points: CashFlowPoint[];
	width: number;
	height: number;
	currency: string;
	granularity: Granularity;
	onSelect: (index: number) => void;
}

const CashFlowBarsPlot: FC<CashFlowBarsPlotProps> = ({
	points,
	width,
	height,
	currency,
	granularity,
	onSelect,
}) => {
	const formatTick = useBucketTickFormat(points, granularity);
	const formatAmountTick = useAmountTickFormat(currency);
	const {
		innerWidth,
		innerHeight,
		bucketScale,
		bucketWidth,
		amountScale,
		bucketStarts,
		centers,
		bars,
		netPoints,
		ticks,
		hover,
		hoveredPoint,
	} = useCashFlowBarsPlot(points, width, height);

	const handleClick = useCallback(() => {
		if (hover.index !== null) {
			onSelect(hover.index);
		}
	}, [hover.index, onSelect]);

	return (
		<>
			<svg width={width} height={height}>
				<Group left={FLOW_CHART_MARGIN.left} top={FLOW_CHART_MARGIN.top}>
					<ChartGridRows scale={amountScale} width={innerWidth} />
					<ShowOnHover target={hover.index}>
						{(index) => (
							<BarHighlight
								x={bucketStarts[index]}
								width={bucketWidth}
								height={innerHeight}
							/>
						)}
					</ShowOnHover>
					{bars.map((bar) => (
						<FlowBar
							key={bar.key}
							x={bar.x}
							y={bar.y}
							width={bar.width}
							height={bar.height}
							color={bar.color}
							dimmed={hover.index !== null && hover.index !== bar.index}
							delay={bar.delay}
						/>
					))}
					<SeriesLine points={netPoints} color={ACCENT_COLOR} strokeWidth={NET_LINE_WIDTH} />
					<ShowOnHoverAt target={hoveredPoint} at={hover.index}>
						{(point, index) => (
							<ChartDot
								cx={centers[index]}
								cy={amountScale(point.net)}
								color={ACCENT_COLOR}
							/>
						)}
					</ShowOnHoverAt>
					<ChartAxisLeft
						scale={amountScale}
						tickFormat={formatAmountTick}
					/>
					<ChartAxisBottom
						top={innerHeight}
						scale={bucketScale}
						tickValues={ticks}
						tickFormat={formatTick}
					/>
					<ChartHitArea
						width={innerWidth}
						height={innerHeight}
						clickable
						onMove={hover.handleMove}
						onLeave={hover.handleLeave}
						onClick={handleClick}
					/>
				</Group>
			</svg>
			<ShowOnHoverAt target={hoveredPoint} at={hover.pointer}>
				{(point, pointer) => (
					<ChartTooltip top={pointer.y} left={pointer.x}>
						<CashFlowTooltipContent
							point={point}
							currency={currency}
							granularity={granularity}
						/>
					</ChartTooltip>
				)}
			</ShowOnHoverAt>
		</>
	);
};

CashFlowBarsPlot.displayName = 'CashFlowBarsPlot';

export { CashFlowBarsPlot };
export type { CashFlowBarsPlotProps };

import { useId } from "react";
import { Group } from "@visx/group";
import { ChartDot, ChartHitArea, LinearFade, SeriesArea, SurplusThreshold } from "@entity/flow";
import { FLOW_CHART_MARGIN, useSurplusPlot } from "@feature/flow";
import { ShowOnHoverAt, SwitchOnMode } from "@feature/interactions";
import {
	ChartAxisBottom,
	ChartAxisLeft,
	ChartCrosshair,
	ChartGridRows,
	ChartTooltip,
	INFLOW_COLOR,
	OUTFLOW_COLOR,
	SeriesLine,
} from "@shared/charts";
import { useAmountTickFormat, useBucketTickFormat } from "@shared/formatting";
import { FADE_OPACITY, LINE_WIDTH } from "./config.ts";
import { SurplusTooltipContent } from "./plot-partials/SurplusTooltipContent.tsx";

import type { FC } from "react";
import type { Granularity } from "@entity/filters";
import type { CumulativePoint, SurplusMode } from "@entity/flow";


interface SurplusPlotProps {
	points: CumulativePoint[];
	width: number;
	height: number;
	currency: string;
	granularity: Granularity;
	mode: SurplusMode;
}

const SurplusPlot: FC<SurplusPlotProps> = ({ points, width, height, currency, granularity, mode }) => {
	const thresholdId = useId();
	const inflowFadeId = useId();
	const outflowFadeId = useId();
	const formatTick = useBucketTickFormat(points, granularity);
	const formatAmountTick = useAmountTickFormat(currency);
	const {
		innerWidth,
		innerHeight,
		resetKey,
		xScale,
		yScale,
		positions,
		inflowLine,
		outflowLine,
		thresholdPoints,
		ticks,
		hover,
		hoveredPoint,
	} = useSurplusPlot(points, granularity, width, height);
	const inflowFill = `url(#${inflowFadeId})`;
	const outflowFill = `url(#${outflowFadeId})`;

	return (
		<>
			<svg width={width} height={height}>
				<defs>
					<LinearFade id={inflowFadeId} color={INFLOW_COLOR} opacity={FADE_OPACITY} />
					<LinearFade id={outflowFadeId} color={OUTFLOW_COLOR} opacity={FADE_OPACITY} />
				</defs>
				<Group key={resetKey} left={FLOW_CHART_MARGIN.left} top={FLOW_CHART_MARGIN.top}>
					<ChartGridRows scale={yScale} width={innerWidth} />
					<SwitchOnMode
						mode={mode}
						views={{
							threshold: (
								<SurplusThreshold
									id={thresholdId}
									points={thresholdPoints}
									height={innerHeight}
									surplusColor={INFLOW_COLOR}
									deficitColor={OUTFLOW_COLOR}
								/>
							),
							lines: (
								<>
									<SeriesArea points={inflowLine} baseline={innerHeight} fill={inflowFill} />
									<SeriesArea points={outflowLine} baseline={innerHeight} fill={outflowFill} />
								</>
							),
						}}
					/>
					<SeriesLine points={inflowLine} color={INFLOW_COLOR} strokeWidth={LINE_WIDTH} />
					<SeriesLine points={outflowLine} color={OUTFLOW_COLOR} strokeWidth={LINE_WIDTH} />
					<ShowOnHoverAt target={hoveredPoint} at={hover.index}>
						{(point, index) => (
							<>
								<ChartCrosshair x={positions[index]} top={0} bottom={innerHeight} />
								<ChartDot cx={positions[index]} cy={yScale(point.inflow)} color={INFLOW_COLOR} />
								<ChartDot cx={positions[index]} cy={yScale(point.outflow)} color={OUTFLOW_COLOR} />
							</>
						)}
					</ShowOnHoverAt>
					<ChartAxisLeft scale={yScale} tickFormat={formatAmountTick} />
					<ChartAxisBottom top={innerHeight} scale={xScale} tickValues={ticks} tickFormat={formatTick} />
					<ChartHitArea
						width={innerWidth}
						height={innerHeight}
						onMove={hover.handleMove}
						onLeave={hover.handleLeave}
					/>
				</Group>
			</svg>
			<ShowOnHoverAt target={hoveredPoint} at={hover.pointer}>
				{(point, pointer) => (
					<ChartTooltip top={pointer.y} left={pointer.x}>
						<SurplusTooltipContent point={point} currency={currency} granularity={granularity} />
					</ChartTooltip>
				)}
			</ShowOnHoverAt>
		</>
	);
};

SurplusPlot.displayName = 'SurplusPlot';

export { SurplusPlot };
export type { SurplusPlotProps };

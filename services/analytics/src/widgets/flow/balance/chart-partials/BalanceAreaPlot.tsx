import { useId } from "react";
import { Group } from "@visx/group";
import { ChartDot, ChartHitArea, LinearFade, SeriesArea } from "@entity/flow";
import { FLOW_CHART_MARGIN, useBalanceAreaPlot } from "@feature/flow";
import { ShowOnHoverAt } from "@feature/interactions";
import {
	ACCENT_COLOR,
	ChartAxisBottom,
	ChartAxisLeft,
	ChartCrosshair,
	ChartGridRows,
	ChartTooltip,
	SeriesLine,
} from "@shared/charts";
import { useAmountTickFormat, useBucketTickFormat } from "@shared/formatting";
import { BalanceTooltipContent } from "./plot-partials/BalanceTooltipContent.tsx";
import { FADE_OPACITY, LINE_WIDTH } from "./config.ts";

import type { FC } from "react";
import type { Granularity } from "@entity/filters";
import type { CashFlowPoint } from "@entity/flow";


interface BalanceAreaPlotProps {
	points: CashFlowPoint[];
	width: number;
	height: number;
	currency: string;
	granularity: Granularity;
}

const BalanceAreaPlot: FC<BalanceAreaPlotProps> = ({ points, width, height, currency, granularity }) => {
	const gradientId = useId();
	const formatTick = useBucketTickFormat(points, granularity);
	const formatAmountTick = useAmountTickFormat(currency);
	const {
		innerWidth,
		innerHeight,
		xScale,
		yScale,
		positions,
		linePoints,
		ticks,
		hover,
		hoveredPoint,
	} = useBalanceAreaPlot(points, width, height);
	const areaFill = `url(#${gradientId})`;

	return (
		<>
			<svg width={width} height={height}>
				<defs>
					<LinearFade id={gradientId} color={ACCENT_COLOR} opacity={FADE_OPACITY} />
				</defs>
				<Group left={FLOW_CHART_MARGIN.left} top={FLOW_CHART_MARGIN.top}>
					<ChartGridRows scale={yScale} width={innerWidth} />
					<SeriesArea points={linePoints} baseline={innerHeight} fill={areaFill} />
					<SeriesLine points={linePoints} color={ACCENT_COLOR} strokeWidth={LINE_WIDTH} />
					<ShowOnHoverAt target={hoveredPoint} at={hover.index}>
						{(point, index) => (
							<>
								<ChartCrosshair x={positions[index]} top={0} bottom={innerHeight} />
								<ChartDot cx={positions[index]} cy={yScale(point.balance)} color={ACCENT_COLOR} />
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
						<BalanceTooltipContent point={point} currency={currency} />
					</ChartTooltip>
				)}
			</ShowOnHoverAt>
		</>
	);
};

BalanceAreaPlot.displayName = 'BalanceAreaPlot';

export { BalanceAreaPlot };
export type { BalanceAreaPlotProps };

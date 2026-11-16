import { useId } from "react";
import { Group } from "@visx/group";
import { ChartDot, ChartHitArea, LinearFade, SeriesArea } from "@entity/flow";
import { FLOW_CHART_MARGIN, useSpendingPacePlot } from "@feature/flow";
import { ShowOnHoverAt, ShowOnPresent } from "@feature/interactions";
import {
	ChartAxisBottom,
	ChartAxisLeft,
	ChartCrosshair,
	ChartGridRows,
	ChartTooltip,
	MUTED_INK,
	OUTFLOW_COLOR,
	SeriesLine,
} from "@shared/charts";
import { useAmountTickFormat, useBucketTickFormat } from "@shared/formatting";
import { FADE_OPACITY, LINE_WIDTH } from "./config.ts";
import { PaceTooltipContent } from "./plot-partials/PaceTooltipContent.tsx";

import type { FC } from "react";
import type { Granularity } from "@entity/filters";
import type { PacePoint } from "@entity/flow";


interface SpendingPacePlotProps {
	points: PacePoint[];
	width: number;
	height: number;
	currency: string;
	granularity: Granularity;
}

const SpendingPacePlot: FC<SpendingPacePlotProps> = ({ points, width, height, currency, granularity }) => {
	const gradientId = useId();
	const formatTick = useBucketTickFormat(points, granularity);
	const formatAmountTick = useAmountTickFormat(currency);
	const {
		innerWidth,
		innerHeight,
		xScale,
		yScale,
		currentLine,
		previousLine,
		positions,
		ticks,
		hover,
		hoveredPoint,
	} = useSpendingPacePlot(points, width, height);
	const areaFill = `url(#${gradientId})`;

	return (
		<>
			<svg width={width} height={height}>
				<defs>
					<LinearFade id={gradientId} color={OUTFLOW_COLOR} opacity={FADE_OPACITY} />
				</defs>
				<Group left={FLOW_CHART_MARGIN.left} top={FLOW_CHART_MARGIN.top}>
					<ChartGridRows scale={yScale} width={innerWidth} />
					<SeriesLine points={previousLine} color={MUTED_INK} dashed />
					<SeriesArea points={currentLine} baseline={innerHeight} fill={areaFill} />
					<SeriesLine points={currentLine} color={OUTFLOW_COLOR} strokeWidth={LINE_WIDTH} />
					<ShowOnHoverAt target={hoveredPoint} at={hover.index}>
						{(point, index) => (
							<>
								<ChartCrosshair x={positions[index]} top={0} bottom={innerHeight} />
								<ShowOnPresent value={point.previous}>
									{(previous) => (
										<ChartDot cx={positions[index]} cy={yScale(previous)} color={MUTED_INK} />
									)}
								</ShowOnPresent>
								<ShowOnPresent value={point.current}>
									{(current) => (
										<ChartDot cx={positions[index]} cy={yScale(current)} color={OUTFLOW_COLOR} />
									)}
								</ShowOnPresent>
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
						<PaceTooltipContent point={point} currency={currency} granularity={granularity} />
					</ChartTooltip>
				)}
			</ShowOnHoverAt>
		</>
	);
};

SpendingPacePlot.displayName = 'SpendingPacePlot';

export { SpendingPacePlot };
export type { SpendingPacePlotProps };

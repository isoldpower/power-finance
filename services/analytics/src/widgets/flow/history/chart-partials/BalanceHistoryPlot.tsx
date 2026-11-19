import { useId } from "react";
import { Group } from "@visx/group";
import { ChartDot, ChartHitArea, LinearFade, SeriesArea } from "@entity/flow";
import {
	HISTORY_MARGIN,
	ShowOnTotalSeries,
	useBalanceHistoryPlot,
	useTimestampTickFormat,
} from "@feature/flow";
import { ShowOnHover, ShowOnHoverAt, ShowOnSeriesVisible } from "@feature/interactions";
import {
	ChartAxisBottom,
	ChartAxisLeft,
	ChartCrosshair,
	ChartGridRows,
	ChartTooltip,
	SeriesLine,
	TOTAL_INK,
} from "@shared/charts";
import { useAmountTickFormat } from "@shared/formatting";
import { CLIP_BLEED, FADE_OPACITY, WALLET_DOT_RADIUS } from "./config.ts";
import { HistoryTooltipContent } from "./plot-partials/HistoryTooltipContent.tsx";

import type { FC } from "react";
import type { BalanceHistoryView } from "@entity/flow";


interface BalanceHistoryPlotProps {
	view: BalanceHistoryView;
	domain: [number, number];
	width: number;
	height: number;
	currency: string;
	showTotal: boolean;
	isVisible: (key: string) => boolean;
}

const BalanceHistoryPlot: FC<BalanceHistoryPlotProps> = ({
	view,
	domain,
	width,
	height,
	currency,
	showTotal,
	isVisible,
}) => {
	const gradientId = useId();
	const clipId = useId();
	const formatAmountTick = useAmountTickFormat(currency);
	const formatTick = useTimestampTickFormat(view.timestamps);
	const {
		innerWidth,
		innerHeight,
		visibleWallets,
		resetKey,
		xScale,
		yScale,
		areaBaseline,
		lineMarks,
		positions,
		ticks,
		hover,
		hoveredIndex,
	} = useBalanceHistoryPlot({ view, domain, width, height, showTotal, isVisible });
	const areaFill = `url(#${gradientId})`;
	const clipPath = `url(#${clipId})`;
	const clipHeight = innerHeight + CLIP_BLEED * 2;

	return (
		<>
			<svg width={width} height={height}>
				<defs>
					<LinearFade id={gradientId} color={TOTAL_INK} opacity={FADE_OPACITY} />
					<clipPath id={clipId}>
						<rect width={innerWidth} height={clipHeight} y={-CLIP_BLEED} />
					</clipPath>
				</defs>
				<Group left={HISTORY_MARGIN.left} top={HISTORY_MARGIN.top}>
					<ChartGridRows scale={yScale} width={innerWidth} />
					<g key={resetKey} clipPath={clipPath}>
						{lineMarks.map(({ line, points }) => (
							<g key={line.key} opacity={line.presence}>
								<ShowOnTotalSeries isTotal={line.isTotal}>
									<SeriesArea
										points={points}
										baseline={areaBaseline}
										fill={areaFill}
									/>
								</ShowOnTotalSeries>
								<SeriesLine
									points={points}
									color={line.color}
									strokeWidth={line.strokeWidth}
								/>
							</g>
						))}
					</g>
					<ShowOnHover target={hoveredIndex}>
						{(index) => (
							<>
								<ChartCrosshair x={positions[index]} top={0} bottom={innerHeight} />
								<ShowOnSeriesVisible visible={showTotal}>
									<ChartDot
										cx={positions[index]}
										cy={yScale(view.total[index])}
										color={TOTAL_INK}
									/>
								</ShowOnSeriesVisible>
								{visibleWallets.map((series) => (
									<ChartDot
										key={series.key}
										cx={positions[index]}
										cy={yScale(series.values[index])}
										color={series.wallet.color}
										radius={WALLET_DOT_RADIUS}
									/>
								))}
							</>
						)}
					</ShowOnHover>
					<ChartAxisLeft
						scale={yScale}
						tickFormat={formatAmountTick}
					/>
					<ChartAxisBottom
						top={innerHeight}
						scale={xScale}
						tickValues={ticks}
						tickFormat={formatTick}
					/>
					<ChartHitArea
						width={innerWidth}
						height={innerHeight}
						onMove={hover.handleMove}
						onLeave={hover.handleLeave}
					/>
				</Group>
			</svg>
			<ShowOnHoverAt target={hoveredIndex} at={hover.pointer}>
				{(index, pointer) => (
					<ChartTooltip top={pointer.y} left={pointer.x}>
						<HistoryTooltipContent
							index={index}
							view={view}
							visibleWallets={visibleWallets}
							showTotal={showTotal}
							currency={currency}
						/>
					</ChartTooltip>
				)}
			</ShowOnHoverAt>
		</>
	);
};

BalanceHistoryPlot.displayName = 'BalanceHistoryPlot';

export { BalanceHistoryPlot };
export type { BalanceHistoryPlotProps };

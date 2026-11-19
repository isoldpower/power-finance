import { Group } from "@visx/group";
import { StackLayer } from "@entity/spending";
import { ShowOnHover, ShowOnHoverAt, ShowOnMode } from "@feature/interactions";
import { TRENDS_MARGIN, useCategoryTrendsPlot } from "@feature/spending";
import {
	ChartAxisBottom,
	ChartAxisLeft,
	ChartCrosshair,
	ChartGridRows,
	ChartTooltip,
	SeriesLine,
	TOTAL_INK,
} from "@shared/charts";
import { useAmountTickFormat, useBucketTickFormat } from "@shared/formatting";
import { TREND_LINE_WIDTH } from "./config.ts";
import { TrendsTooltipContent } from "./plot-partials/TrendsTooltipContent.tsx";

import type { FC } from "react";
import type { Granularity } from "@entity/filters";
import type { TrendLayer, TrendRow, TrendsMode } from "@entity/spending";


interface CategoryTrendsPlotProps {
	rows: TrendRow[];
	layers: TrendLayer[];
	isVisible: (key: string) => boolean;
	mode: TrendsMode;
	width: number;
	height: number;
	currency: string;
	granularity: Granularity;
	colorOf: (key: string) => string;
	focused: string | null;
	onFocus: (key: string | null) => void;
	onSelect: (layer: TrendLayer) => void;
}

const CategoryTrendsPlot: FC<CategoryTrendsPlotProps> = ({
	rows,
	layers,
	isVisible,
	mode,
	width,
	height,
	currency,
	granularity,
	colorOf,
	focused,
	onFocus,
	onSelect,
}) => {
	const formatTick = useBucketTickFormat(rows, granularity);
	const formatAmountTick = useAmountTickFormat(currency);
	const {
		innerWidth,
		innerHeight,
		xScale,
		yScale,
		trend,
		lineMarks,
		bandMarks,
		positions,
		ticks,
		tooltipLayers,
		hover,
		hoveredRow,
	} = useCategoryTrendsPlot({ rows, layers, isVisible, mode, granularity, width, height });

	return (
		<>
			<svg width={width} height={height}>
				<Group
					left={TRENDS_MARGIN.left}
					top={TRENDS_MARGIN.top}
					onMouseMove={hover.handleMove}
					onMouseLeave={hover.handleLeave}
				>
					<rect width={innerWidth} height={innerHeight} fill="transparent" />
					<ShowOnMode mode={mode} on="stacked">
						<ChartGridRows scale={yScale} width={innerWidth} />
					</ShowOnMode>
					{bandMarks.map(({ key, layer, path }) => (
						<StackLayer
							key={key}
							path={path}
							color={colorOf(key)}
							dimmed={focused !== null && focused !== key}
							label={layer.label}
							onHover={(hovered) => { onFocus(hovered ? key : null); }}
							onSelect={() => { onSelect(layer); }}
						/>
					))}
					{lineMarks.map(({ key, points }) => (
						<SeriesLine
							key={key}
							points={points}
							color={TOTAL_INK}
							dashed
							strokeWidth={TREND_LINE_WIDTH}
						/>
					))}
					<ShowOnHover target={hover.index}>
						{(index) => <ChartCrosshair x={positions[index]} top={0} bottom={innerHeight} />}
					</ShowOnHover>
					<ShowOnMode mode={mode} on="stacked">
						<ChartAxisLeft scale={yScale} tickFormat={formatAmountTick} />
					</ShowOnMode>
					<ChartAxisBottom top={innerHeight} scale={xScale} tickValues={ticks} tickFormat={formatTick} />
				</Group>
			</svg>
			<ShowOnHoverAt target={hoveredRow} at={hover.pointer}>
				{(row, pointer) => (
					<ChartTooltip top={pointer.y} left={pointer.x}>
						<TrendsTooltipContent
							row={row}
							layers={tooltipLayers}
							trend={trend}
							colorOf={colorOf}
							currency={currency}
							granularity={granularity}
						/>
					</ChartTooltip>
				)}
			</ShowOnHoverAt>
		</>
	);
};

CategoryTrendsPlot.displayName = 'CategoryTrendsPlot';

export { CategoryTrendsPlot };
export type { CategoryTrendsPlotProps };

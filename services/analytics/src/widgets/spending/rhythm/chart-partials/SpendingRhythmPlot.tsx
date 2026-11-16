import { useMemo } from "react";
import { Group } from "@visx/group";
import { HeatmapRect } from "@visx/heatmap";
import { AxisLabel, HEAT_EMPTY, RhythmHeatCell, toRhythmGrid } from "@entity/spending";
import { ShowOnHoverAt } from "@feature/interactions";
import { RHYTHM_LABEL_WIDTH, useSpendingRhythmPlot } from "@feature/spending";
import { ChartTooltip } from "@shared/charts";
import { GAP, WEEKDAY_LABEL_X } from "./config.ts";
import { RhythmTooltipContent } from "./plot-partials/RhythmTooltipContent.tsx";

import type { FC } from "react";
import type { RhythmBin, RhythmColumn, SpendingRhythm } from "@entity/spending";


interface SpendingRhythmPlotProps {
	rhythm: SpendingRhythm;
	width: number;
	currency: string;
	color: string;
}

const SpendingRhythmPlot: FC<SpendingRhythmPlotProps> = ({ rhythm, width, currency, color }) => {
	const grid = useMemo(() => {
		return toRhythmGrid(rhythm);
	}, [rhythm]);
	const {
		sizing,
		weekdays,
		hours,
		hoveredCell,
		tooltipAnchor,
		colorScale,
		columnX,
		rowY,
		hoverCell,
		isCellHovered,
	} = useSpendingRhythmPlot(grid, width, color);
	const frameStyle = useMemo(() => {
		return { height: sizing.height };
	}, [sizing.height]);

	return (
		<div className="relative" style={frameStyle}>
			<svg width={width} height={sizing.height}>
				<Group left={RHYTHM_LABEL_WIDTH}>
					{weekdays.map((mark) => (
						<AxisLabel key={mark.label} x={WEEKDAY_LABEL_X} y={mark.y} anchor="end">
							{mark.label}
						</AxisLabel>
					))}
					{hours.map((mark) => (
						<AxisLabel key={mark.hour} x={mark.x} y={sizing.hourAxisY} anchor="middle">
							{mark.label}
						</AxisLabel>
					))}
					<HeatmapRect<RhythmColumn, RhythmBin>
						data={grid.columns}
						xScale={columnX}
						yScale={rowY}
						binWidth={sizing.cellWidth}
						binHeight={sizing.cellHeight}
						gap={GAP}
						colorScale={colorScale}
						bins={(column) => column.bins}
						count={(bin) => bin.count}
					>
						{(cells) => cells.flatMap((column) => column.map((cell) => (
							<RhythmHeatCell
								key={`${cell.column.toString()}-${cell.row.toString()}`}
								x={cell.x}
								y={cell.y}
								width={cell.width}
								height={cell.height}
								fill={cell.color ?? HEAT_EMPTY}
								active={isCellHovered(cell.row, cell.column)}
								onHover={(hovered) => {
									hoverCell({ weekday: cell.row, hour: cell.column, bin: cell.bin }, hovered);
								}}
							/>
						)))}
					</HeatmapRect>
				</Group>
			</svg>
			<ShowOnHoverAt target={hoveredCell} at={tooltipAnchor}>
				{(cell, anchor) => (
					<ChartTooltip top={anchor.top} left={anchor.left}>
						<RhythmTooltipContent cell={cell} color={color} currency={currency} />
					</ChartTooltip>
				)}
			</ShowOnHoverAt>
		</div>
	);
};

SpendingRhythmPlot.displayName = 'SpendingRhythmPlot';

export { SpendingRhythmPlot };
export type { SpendingRhythmPlotProps };

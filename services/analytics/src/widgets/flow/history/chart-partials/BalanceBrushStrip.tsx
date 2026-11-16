import { useId } from "react";
import { Brush } from "@visx/brush";
import { Group } from "@visx/group";
import { BrushHandle, LinearFade, SeriesArea } from "@entity/flow";
import { HISTORY_MARGIN, ShowOnBrushActive, useBalanceBrushStrip } from "@feature/flow";
import { ACCENT_COLOR, SeriesLine } from "@shared/charts";
import {
	BRUSH_FADE_OPACITY,
	BRUSH_HANDLE_SIZE,
	BRUSH_LINE_WIDTH,
	BRUSH_SELECTED_BOX_STYLE,
	BRUSH_TRACK_FILL,
	BRUSH_TRACK_OPACITY,
	BRUSH_TRACK_RADIUS,
} from "./config.ts";

import type { FC } from "react";


interface BalanceBrushStripProps {
	values: number[];
	width: number;
	height: number;
	onZoom: (start: number, end: number) => void;
	onClear: () => void;
}

const BalanceBrushStrip: FC<BalanceBrushStripProps> = ({ values, width, height, onZoom, onClear }) => {
	const gradientId = useId();
	const { innerWidth, xScale, yScale, points, handleBrushChange } = useBalanceBrushStrip({
		values,
		width,
		height,
		onZoom,
		onClear,
	});
	const areaFill = `url(#${gradientId})`;

	return (
		<svg width={width} height={height} aria-label="Drag to zoom the balance chart">
			<defs>
				<LinearFade id={gradientId} color={ACCENT_COLOR} opacity={BRUSH_FADE_OPACITY} />
			</defs>
			<Group left={HISTORY_MARGIN.left}>
				<rect
					width={innerWidth}
					height={height}
					rx={BRUSH_TRACK_RADIUS}
					fill={BRUSH_TRACK_FILL}
					opacity={BRUSH_TRACK_OPACITY}
				/>
				<SeriesArea
					points={points}
					baseline={height}
					fill={areaFill}
				/>
				<SeriesLine
					points={points}
					color={ACCENT_COLOR}
					strokeWidth={BRUSH_LINE_WIDTH}
					animated={false}
				/>
				<Brush
					xScale={xScale}
					yScale={yScale}
					width={innerWidth}
					height={height}
					handleSize={BRUSH_HANDLE_SIZE}
					resizeTriggerAreas={['left', 'right']}
					brushDirection="horizontal"
					selectedBoxStyle={BRUSH_SELECTED_BOX_STYLE}
					onChange={handleBrushChange}
					onClick={onClear}
					useWindowMoveEvents
					disableDraggingSelection={false}
					renderBrushHandle={(handle) => (
						<ShowOnBrushActive active={handle.isBrushActive}>
							<BrushHandle x={handle.x} height={handle.height} />
						</ShowOnBrushActive>
					)}
				/>
			</Group>
		</svg>
	);
};

BalanceBrushStrip.displayName = 'BalanceBrushStrip';

export { BalanceBrushStrip };
export type { BalanceBrushStripProps };

import { useMemo } from "react";
import { BarRounded } from "@visx/shape";

import type { FC } from "react";


interface FlowBarProps {
	x: number;
	y: number;
	width: number;
	height: number;
	color: string;
	dimmed?: boolean;
	delay?: number;
}

const BAR_RADIUS = 4;

const FlowBar: FC<FlowBarProps> = ({ x, y, width, height, color, dimmed = false, delay = 0 }) => {
	const barWidth = useMemo(() => {
		return Math.max(0, width);
	}, [width]);

	const barHeight = useMemo(() => {
		return Math.max(0, height);
	}, [height]);

	const radius = useMemo(() => {
		return Math.min(BAR_RADIUS, width / 2);
	}, [width]);

	const style = useMemo(() => {
		return { animationDelay: `${delay.toString()}ms` };
	}, [delay]);

	return (
		<BarRounded
			x={x}
			y={y}
			width={barWidth}
			height={barHeight}
			radius={radius}
			top
			fill={color}
			opacity={dimmed ? 0.35 : 1}
			className="fx-grow-y transition-opacity"
			style={style}
			pointerEvents="none"
		/>
	);
};

FlowBar.displayName = 'FlowBar';

export { FlowBar };
export type { FlowBarProps };

import type { FC, MouseEvent, TouchEvent } from "react";


interface ChartHitAreaProps {
	width: number;
	height: number;
	left?: number;
	top?: number;
	clickable?: boolean;
	onMove: (event: MouseEvent<SVGElement> | TouchEvent<SVGElement>) => void;
	onLeave: () => void;
	onClick?: () => void;
}

const ChartHitArea: FC<ChartHitAreaProps> = ({
	width,
	height,
	left = 0,
	top = 0,
	clickable = false,
	onMove,
	onLeave,
	onClick,
}) => (
	<rect
		x={left}
		y={top}
		width={Math.max(0, width)}
		height={Math.max(0, height)}
		fill="transparent"
		onMouseMove={onMove}
		onTouchMove={onMove}
		onTouchStart={onMove}
		onMouseLeave={onLeave}
		onClick={onClick}
		style={{ cursor: clickable ? 'pointer' : 'crosshair' }}
	/>
);

ChartHitArea.displayName = 'ChartHitArea';

export { ChartHitArea };
export type { ChartHitAreaProps };

import type { FC } from "react";


interface ChartCrosshairProps {
	x: number;
	top: number;
	bottom: number;
}

const ChartCrosshair: FC<ChartCrosshairProps> = ({ x, top, bottom }) => (
	<line
		x1={x}
		x2={x}
		y1={top}
		y2={bottom}
		stroke="var(--text-3)"
		strokeWidth={1}
		strokeDasharray="3 3"
		pointerEvents="none"
	/>
);

ChartCrosshair.displayName = 'ChartCrosshair';

export { ChartCrosshair };
export type { ChartCrosshairProps };

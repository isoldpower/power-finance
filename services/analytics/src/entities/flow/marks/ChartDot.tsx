import type { FC } from "react";


interface ChartDotProps {
	cx: number;
	cy: number;
	color: string;
	radius?: number;
}

const ChartDot: FC<ChartDotProps> = ({ cx, cy, color, radius = 4.5 }) => (
	<circle
		cx={cx}
		cy={cy}
		r={radius}
		fill={color}
		stroke="var(--surface)"
		strokeWidth={2}
		pointerEvents="none"
		className="fx-pop"
	/>
);

ChartDot.displayName = 'ChartDot';

export { ChartDot };
export type { ChartDotProps };

import type { FC } from "react";


interface RadarShapeProps {
	points: string;
	color: string;
	dashed?: boolean;
	filled?: boolean;
}

const RadarShape: FC<RadarShapeProps> = ({ points, color, dashed = false, filled = true }) => (
	<polygon
		points={points}
		fill={filled ? color : 'none'}
		fillOpacity={filled ? 0.18 : 0}
		stroke={color}
		strokeWidth={2}
		strokeLinejoin="round"
		strokeDasharray={dashed ? '5 4' : undefined}
		pointerEvents="none"
	/>
);

RadarShape.displayName = 'RadarShape';

export { RadarShape };
export type { RadarShapeProps };

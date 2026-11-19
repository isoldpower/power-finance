import { useMemo } from "react";

import type { FC } from "react";


interface SankeyNodeBarProps {
	x: number;
	y: number;
	width: number;
	height: number;
	color: string;
}

const SankeyNodeBar: FC<SankeyNodeBarProps> = ({ x, y, width, height, color }) => {
	const barHeight = useMemo(() => {
		return Math.max(2, height);
	}, [height]);

	return (
		<rect
			x={x}
			y={y}
			width={width}
			height={barHeight}
			rx={3}
			fill={color}
			className="fx-fade"
		/>
	);
};

SankeyNodeBar.displayName = 'SankeyNodeBar';

export { SankeyNodeBar };
export type { SankeyNodeBarProps };

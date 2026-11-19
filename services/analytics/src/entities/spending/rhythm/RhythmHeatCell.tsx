import { useMemo } from "react";
import { useHoverToggle } from "@shared/charts";

import type { FC } from "react";


interface RhythmHeatCellProps {
	x: number;
	y: number;
	width: number;
	height: number;
	fill: string;
	active: boolean;
	onHover: (hovered: boolean) => void;
}

const RhythmHeatCell: FC<RhythmHeatCellProps> = ({ x, y, width, height, fill, active, onHover }) => {
	const { handleHoverStart, handleHoverEnd } = useHoverToggle(onHover);

	const cellWidth = useMemo(() => {
		return Math.max(0, width);
	}, [width]);

	const cellHeight = useMemo(() => {
		return Math.max(0, height);
	}, [height]);

	return (
		<rect
			x={x}
			y={y}
			width={cellWidth}
			height={cellHeight}
			rx={3}
			fill={fill}
			stroke={active ? 'var(--text)' : 'transparent'}
			strokeWidth={1.5}
			className="fx-fade [transition:fill_500ms_ease-out,stroke_150ms_ease]"
			onMouseEnter={handleHoverStart}
			onMouseLeave={handleHoverEnd}
		/>
	);
};

RhythmHeatCell.displayName = 'RhythmHeatCell';

export { RhythmHeatCell };
export type { RhythmHeatCellProps };

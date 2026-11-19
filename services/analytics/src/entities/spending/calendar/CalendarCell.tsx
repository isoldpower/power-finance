import { useMemo } from "react";
import { useHoverToggle } from "@shared/charts";

import type { FC } from "react";


interface CalendarCellProps {
	x: number;
	y: number;
	size: number;
	fill: string;
	active: boolean;
	label: string;
	onHover: (hovered: boolean) => void;
	onSelect: () => void;
}

const CalendarCell: FC<CalendarCellProps> = ({ x, y, size, fill, active, label, onHover, onSelect }) => {
	const { handleHoverStart, handleHoverEnd } = useHoverToggle(onHover);

	const radius = useMemo(() => {
		return Math.min(4, size / 4);
	}, [size]);

	return (
		<rect
			x={x}
			y={y}
			width={size}
			height={size}
			rx={radius}
			fill={fill}
			stroke={active ? 'var(--text)' : 'transparent'}
			strokeWidth={1.5}
			role="button"
			aria-label={label}
			className="cursor-pointer fx-pop [transition:fill_500ms_ease-out,stroke_150ms_ease]"
			onMouseEnter={handleHoverStart}
			onMouseLeave={handleHoverEnd}
			onClick={onSelect}
		/>
	);
};

CalendarCell.displayName = 'CalendarCell';

export { CalendarCell };
export type { CalendarCellProps };

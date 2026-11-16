import { useCallback, useMemo } from "react";

import type { FC, KeyboardEvent } from "react";


interface DonutSliceProps {
	path: string;
	offset: { x: number; y: number };
	color: string;
	active: boolean;
	dimmed: boolean;
	label: string;
	onHover: (hovered: boolean) => void;
	onSelect: () => void;
}

const DonutSlice: FC<DonutSliceProps> = ({ path, offset, color, active, dimmed, label, onHover, onSelect }) => {
	const style = useMemo(() => {
		return {
			transform: active
				? `translate(${offset.x.toFixed(1)}px, ${offset.y.toFixed(1)}px)`
				: 'none',
		};
	}, [active, offset.x, offset.y]);

	const handleMouseEnter = useCallback(() => {
		onHover(true);
	}, [onHover]);

	const handleMouseLeave = useCallback(() => {
		onHover(false);
	}, [onHover]);

	const handleKeyDown = useCallback((event: KeyboardEvent) => {
		if (event.key === 'Enter' || event.key === ' ') {
			onSelect();
		}
	}, [onSelect]);

	return (
		<path
			d={path}
			fill={color}
			stroke="var(--surface)"
			strokeWidth={2}
			role="button"
			aria-label={label}
			tabIndex={0}
			opacity={dimmed ? 0.35 : 1}
			className="cursor-pointer outline-none transition-[opacity,transform] duration-200 focus-visible:opacity-80"
			style={style}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onFocus={handleMouseEnter}
			onBlur={handleMouseLeave}
			onClick={onSelect}
			onKeyDown={handleKeyDown}
		/>
	);
};

DonutSlice.displayName = 'DonutSlice';

export { DonutSlice };
export type { DonutSliceProps };

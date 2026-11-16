import { useHoverToggle } from "@shared/charts";

import type { FC } from "react";


interface StackLayerProps {
	path: string;
	color: string;
	dimmed: boolean;
	label: string;
	onHover: (hovered: boolean) => void;
	onSelect: () => void;
}

const StackLayer: FC<StackLayerProps> = ({ path, color, dimmed, label, onHover, onSelect }) => {
	const { handleHoverStart, handleHoverEnd } = useHoverToggle(onHover);

	return (
		<path
			d={path}
			fill={color}
			fillOpacity={dimmed ? 0.18 : 0.82}
			stroke="var(--surface)"
			strokeWidth={1}
			aria-label={label}
			className="cursor-pointer fx-fade transition-[fill-opacity] duration-200"
			onMouseEnter={handleHoverStart}
			onMouseLeave={handleHoverEnd}
			onClick={onSelect}
		/>
	);
};

StackLayer.displayName = 'StackLayer';

export { StackLayer };
export type { StackLayerProps };

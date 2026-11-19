import { useMemo } from "react";
import { useHoverToggle } from "@shared/charts";

import type { FC } from "react";


interface SankeyLinkMarkProps {
	path: string;
	width: number;
	presence?: number;
	color: string;
	emphasis: 'normal' | 'active' | 'dimmed';
	onHover: (hovered: boolean) => void;
	onSelect: () => void;
}

const OPACITY: Record<SankeyLinkMarkProps['emphasis'], number> = {
	normal: 0.32,
	active: 0.62,
	dimmed: 0.08,
};

const SankeyLinkMark: FC<SankeyLinkMarkProps> = ({
	path,
	width,
	presence = 1,
	color,
	emphasis,
	onHover,
	onSelect
}) => {
	const { handleHoverStart, handleHoverEnd } = useHoverToggle(onHover);

	const strokeWidth = useMemo(() => {
		return Math.max(1, width);
	}, [width]);

	const strokeOpacity = useMemo(() => {
		return OPACITY[emphasis] * presence;
	}, [emphasis, presence]);

	return (
		<path
			d={path}
			fill="none"
			stroke={color}
			strokeWidth={strokeWidth}
			strokeOpacity={strokeOpacity}
			className="cursor-pointer fx-fade transition-[stroke-opacity] duration-200"
			onMouseEnter={handleHoverStart}
			onMouseLeave={handleHoverEnd}
			onClick={onSelect}
		/>
	);
};

SankeyLinkMark.displayName = 'SankeyLinkMark';

export { SankeyLinkMark };
export type { SankeyLinkMarkProps };

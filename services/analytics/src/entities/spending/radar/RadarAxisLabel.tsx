import { useMemo } from "react";
import { useHoverToggle } from "@shared/charts";

import type { FC } from "react";


interface RadarAxisLabelProps {
	x: number;
	y: number;
	label: string;
	color: string;
	active: boolean;
	onHover: (hovered: boolean) => void;
	onSelect: () => void;
}

const RadarAxisLabel: FC<RadarAxisLabelProps> = ({ x, y, label, color, active, onHover, onSelect }) => {
	const { handleHoverStart, handleHoverEnd } = useHoverToggle(onHover);

	const placement = useMemo(() => {
		const anchor = Math.abs(x) < 4 ? 'middle' : x > 0 ? 'start' : 'end';

		return {
			anchor,
			transform: `translate(${x.toFixed(1)}, ${y.toFixed(1)})`,
			dotX: anchor === 'end' ? 6 : anchor === 'start' ? -6 : 0,
			textDx: anchor === 'end' ? -4 : anchor === 'start' ? 4 : 0,
			textY: anchor === 'middle' ? (y > 0 ? 10 : -14) : -4,
		} as const;
	}, [x, y]);

	return (
		<g
			transform={placement.transform}
			className="cursor-pointer"
			onMouseEnter={handleHoverStart}
			onMouseLeave={handleHoverEnd}
			onClick={onSelect}
		>
			<circle r={4} fill={color} cy={-4} cx={placement.dotX} />
			<text
				textAnchor={placement.anchor}
				dy={0}
				fill={active ? 'var(--text)' : 'var(--text-2)'}
				fontSize={11.5}
				fontWeight={active ? 600 : 500}
				dx={placement.textDx}
				dominantBaseline="middle"
				y={placement.textY}
			>
				{label}
			</text>
		</g>
	);
};

RadarAxisLabel.displayName = 'RadarAxisLabel';

export { RadarAxisLabel };
export type { RadarAxisLabelProps };

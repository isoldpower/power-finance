import { useMemo } from "react";
import { useHoverToggle } from "@shared/charts";
import { Arc } from "@visx/shape";

import type { FC } from "react";


interface RadialBarProps {
	innerRadius: number;
	outerRadius: number;
	endAngle: number;
	color: string;
	dimmed: boolean;
	label: string;
	onHover: (hovered: boolean) => void;
	onSelect: () => void;
}

const FULL_TURN = Math.PI * 2;

const RadialBar: FC<RadialBarProps> = ({
	innerRadius,
	outerRadius,
	endAngle,
	color,
	dimmed,
	label,
	onHover,
	onSelect,
}) => {
	const { handleHoverStart, handleHoverEnd } = useHoverToggle(onHover);

	const barEndAngle = useMemo(() => {
		return Math.max(0.02, endAngle);
	}, [endAngle]);

	const cornerRadius = useMemo(() => {
		return (outerRadius - innerRadius) / 2;
	}, [innerRadius, outerRadius]);

	return (
		<g
			role="button"
			aria-label={label}
			className="cursor-pointer"
			onMouseEnter={handleHoverStart}
			onMouseLeave={handleHoverEnd}
			onClick={onSelect}
		>
			<Arc
				innerRadius={innerRadius}
				outerRadius={outerRadius}
				startAngle={0}
				endAngle={FULL_TURN}
				fill="var(--chart-heat-0)"
			/>
			<Arc
				innerRadius={innerRadius}
				outerRadius={outerRadius}
				startAngle={0}
				endAngle={barEndAngle}
				cornerRadius={cornerRadius}
				fill={color}
				opacity={dimmed ? 0.35 : 1}
				className="fx-fade transition-opacity"
			/>
		</g>
	);
};

RadialBar.displayName = 'RadialBar';

export { RadialBar };
export type { RadialBarProps };

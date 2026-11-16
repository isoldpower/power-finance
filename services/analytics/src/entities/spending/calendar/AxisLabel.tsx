import type { FC, PropsWithChildren } from "react";


type AxisLabelProps = PropsWithChildren<{
	x: number;
	y: number;
	anchor?: 'start' | 'middle' | 'end';
}>;

const AxisLabel: FC<AxisLabelProps> = ({ x, y, anchor = 'start', children }) => (
	<text
		x={x}
		y={y}
		textAnchor={anchor}
		dominantBaseline="middle"
		fill="var(--text-3)"
		fontSize={10.5}
		className="font-numeric"
		pointerEvents="none"
	>
		{children}
	</text>
);

AxisLabel.displayName = 'AxisLabel';

export { AxisLabel };
export type { AxisLabelProps };

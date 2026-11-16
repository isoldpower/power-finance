import type { FC, ReactNode } from "react";


interface SankeyNodeValueProps {
	x: number;
	y: number;
	anchor: 'start' | 'end';
	children: ReactNode;
}

const SankeyNodeValue: FC<SankeyNodeValueProps> = ({ x, y, anchor, children }) => (
	<text
		x={x}
		y={y}
		textAnchor={anchor}
		dominantBaseline="middle"
		fill="var(--text-3)"
		fontSize={11}
		className="font-numeric"
		stroke="var(--surface)"
		strokeWidth={3}
		paintOrder="stroke"
	>
		{children}
	</text>
);

SankeyNodeValue.displayName = 'SankeyNodeValue';

export { SankeyNodeValue };
export type { SankeyNodeValueProps };

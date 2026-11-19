import type { FC, ReactNode } from "react";


interface SankeyNodeLabelProps {
	x: number;
	y: number;
	anchor: 'start' | 'end';
	children: ReactNode;
}

const SankeyNodeLabel: FC<SankeyNodeLabelProps> = ({ x, y, anchor, children }) => (
	<text
		x={x}
		y={y}
		textAnchor={anchor}
		dominantBaseline="middle"
		fill="var(--text)"
		fontSize={12}
		fontWeight={600}
		stroke="var(--surface)"
		strokeWidth={3}
		paintOrder="stroke"
	>
		{children}
	</text>
);

SankeyNodeLabel.displayName = 'SankeyNodeLabel';

export { SankeyNodeLabel };
export type { SankeyNodeLabelProps };

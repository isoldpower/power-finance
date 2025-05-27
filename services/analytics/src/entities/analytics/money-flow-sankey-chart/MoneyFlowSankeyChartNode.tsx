import { SankeyNode } from "@visx/sankey";
import { BarRounded } from "@visx/shape";
import type { FC } from "react";

import type { MoneyFlowNode, MoneyFlowPiece } from "../model";


interface MoneyFlowSankeyChartNodeProps {
	node: SankeyNode<MoneyFlowNode, MoneyFlowPiece>;
	color?: string;
}

const MoneyFlowSankeyChartNode: FC<MoneyFlowSankeyChartNodeProps> = ({
	node,
	color = 'var(--color-chart-1)'
}) => {
	const x1Protected = node.x1 ?? 0;
	const x0Protected = node.x0 ?? 0;
	const y1Protected = node.y1 ?? 0;
	const y0Protected = node.y0 ?? 0;

	return (
		<BarRounded
			width={x1Protected - x0Protected}
			height={y1Protected - y0Protected}
			x={x0Protected}
			y={y0Protected}
			radius={3}
			fill={color}
			all
		/>
	);
};

MoneyFlowSankeyChartNode.displayName = 'MoneyFlowSankeyChartNode';

export { MoneyFlowSankeyChartNode };
export type { MoneyFlowSankeyChartNodeProps };

import { ChartTooltip } from "@shared/charts";
import { useAmountFormat } from "@shared/formatting";
import { incomeShare } from "@feature/flow";

import type { FC } from "react";
import type { PositionedNode } from "@feature/flow";


interface NodeTooltipContentProps {
	node: PositionedNode;
	color: string;
	totalInflow: number;
	currency: string;
}

const NodeTooltipContent: FC<NodeTooltipContentProps> = ({ node, color, totalInflow, currency }) => {
	const formatAmount = useAmountFormat(currency);

	return (
		<>
			<ChartTooltip.Title>
				{node.node.label}
			</ChartTooltip.Title>
			<ChartTooltip.Row color={color} label="Flow">
				{formatAmount(node.value)}
			</ChartTooltip.Row>
			<ChartTooltip.Row label="Of income">
				{incomeShare(node.value, totalInflow)}
			</ChartTooltip.Row>
		</>
	);
};

NodeTooltipContent.displayName = 'NodeTooltipContent';

export { NodeTooltipContent };
export type { NodeTooltipContentProps };

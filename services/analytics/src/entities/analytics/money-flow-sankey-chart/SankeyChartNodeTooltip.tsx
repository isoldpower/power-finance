import { SankeyNode } from "@visx/sankey";
import { useTooltip } from "@visx/tooltip";
import type { FC } from "react";
import type { MoneyFlowNode, MoneyFlowPiece } from "../model";

interface SankeyChartNodeTooltipProps {
	tooltipData: ReturnType<typeof useTooltip<SankeyNode<MoneyFlowNode, MoneyFlowPiece>>>['tooltipData'];
}

const SankeyChartNodeTooltip: FC<SankeyChartNodeTooltipProps> = ({
	tooltipData
}) => {
	return tooltipData && (
		<div>
			<p className="font-bold">
				{tooltipData.name}
			</p>
		</div>
	)
}

SankeyChartNodeTooltip.displayName = 'SankeyChartNodeTooltip';

export { SankeyChartNodeTooltip };
export type { SankeyChartNodeTooltipProps };
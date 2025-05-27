import { useTooltip } from "@visx/tooltip";
import type{ SankeyLink } from "@visx/sankey";
import type { FC } from "react";

import type { MoneyFlowNode, MoneyFlowPiece } from "../model";
import { Icons } from "@internal/ui-library";


interface SankeyChartFlowTooltipProps {
	tooltipData: ReturnType<typeof useTooltip<SankeyLink<MoneyFlowNode, MoneyFlowPiece>>>['tooltipData'];
}

const SankeyChartFlowTooltip: FC<SankeyChartFlowTooltipProps> = ({
	tooltipData
}) => {
	return tooltipData && (
		<div>
			<h3 className="font-bold text-sm">
				Money Transfer ({`$${tooltipData.value.toFixed(2).toString()}`})
			</h3>
			<p className="flex gap-2 items-center pt-2">
				<span>{tooltipData.source.name}</span>
				<Icons.ArrowRight size={16} />
				<span>{tooltipData.target.name}</span>
			</p>
		</div>
	)
}

SankeyChartFlowTooltip.displayName = 'SankeyChartFlowTooltip';

export { SankeyChartFlowTooltip };
export type { SankeyChartFlowTooltipProps };
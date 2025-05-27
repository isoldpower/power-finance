import { useCallback } from "react";
import { localPoint } from "@visx/event";
import { Group } from "@visx/group";
import { SankeyNode } from "@visx/sankey";
import { useTooltip } from "@visx/tooltip";
import type { FC, ReactNode, PointerEvent, TouchEvent } from "react";

import type { MoneyFlowNode, MoneyFlowPiece } from "@entity/analytics/model";


interface SankeyChartNodeInteractionsProps {
	children: ReactNode;
	showTooltip: ReturnType<typeof useTooltip<SankeyNode<MoneyFlowNode, MoneyFlowPiece>>>['showTooltip'];
	hideTooltip: ReturnType<typeof useTooltip<SankeyNode<MoneyFlowNode, MoneyFlowPiece>>>['hideTooltip'];
	node: SankeyNode<MoneyFlowNode, MoneyFlowPiece>
}

const SankeyChartNodeInteractions: FC<SankeyChartNodeInteractionsProps> = ({
	children,
	showTooltip,
	hideTooltip,
	node
}) => {
	const handleHover = useCallback((event: PointerEvent<SVGElement> | TouchEvent<SVGElement>) => {
		const ownerElement = (event.target as SVGElement).ownerSVGElement;
		
		if (!ownerElement) return;
		const coords = localPoint(ownerElement, event);

		showTooltip({
			tooltipData: node,
			tooltipTop: (coords?.y ?? 0) + 10,
			tooltipLeft: (coords?.x ?? 0) + 10,
		});
	}, [node, showTooltip]);

	return (
		<Group
			onPointerMove={handleHover}
			onTouchStart={handleHover}
			onTouchMove={handleHover}
			onMouseOut={hideTooltip}
		>
			{ children }
		</Group>
	);
};

SankeyChartNodeInteractions.displayName = 'SankeyChartNodeInteractions';

export { SankeyChartNodeInteractions };
export type { SankeyChartNodeInteractionsProps };
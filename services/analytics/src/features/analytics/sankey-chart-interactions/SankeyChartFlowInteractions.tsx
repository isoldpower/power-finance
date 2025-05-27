import { useCallback } from "react";
import { localPoint } from "@visx/event";
import { Group } from "@visx/group";
import { SankeyLink } from "@visx/sankey";
import { useTooltip } from "@visx/tooltip";
import type { FC, ReactNode, PointerEvent, TouchEvent } from "react";

import type { MoneyFlowNode, MoneyFlowPiece } from "@entity/analytics/model";


interface SankeyChartFlowInteractionsProps {
	children: ReactNode;
	showTooltip: ReturnType<typeof useTooltip<SankeyLink<MoneyFlowNode, MoneyFlowPiece>>>['showTooltip'];
	hideTooltip: ReturnType<typeof useTooltip<SankeyLink<MoneyFlowNode, MoneyFlowPiece>>>['hideTooltip'];
	link: SankeyLink<MoneyFlowNode, MoneyFlowPiece>
}

const SankeyChartFlowInteractions: FC<SankeyChartFlowInteractionsProps> = ({
	children,
	showTooltip,
	hideTooltip,
	link
}) => {
	const handleHover = useCallback((event: PointerEvent<SVGElement> | TouchEvent<SVGElement>) => {
		const ownerElement = (event.target as SVGElement).ownerSVGElement;

		if (!ownerElement) return;
		const coords = localPoint(ownerElement, event);
		showTooltip({
			tooltipData: link,
			tooltipTop: (coords?.y ?? 0) + 10,
			tooltipLeft: (coords?.x ?? 0) + 10,
		});
	}, [link, showTooltip]);

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

SankeyChartFlowInteractions.displayName = 'SankeyChartFlowInteractions';

export { SankeyChartFlowInteractions };
export type { SankeyChartFlowInteractionsProps };
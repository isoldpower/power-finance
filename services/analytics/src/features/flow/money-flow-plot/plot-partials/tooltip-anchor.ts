import type { PositionedLink, PositionedNode } from "../../layout";
import type { TooltipAnchor } from "../types.ts";


const nodeTooltipAnchor = (node: PositionedNode): TooltipAnchor => {
	const middleY = node.y + node.height / 2;
	const rightEdge = node.x + node.width;

	return { top: middleY, left: rightEdge };
};

const linkTooltipAnchor = (link: PositionedLink): TooltipAnchor => {
	const middleY = (link.source.y + link.target.y) / 2;
	const middleX = (link.source.x + link.target.x) / 2;
	const halfWidth = link.width / 2;

	return { top: middleY + halfWidth, left: middleX };
};

export { linkTooltipAnchor, nodeTooltipAnchor };

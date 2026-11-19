import type { PositionedLink, PositionedNode } from "../../layout";
import type { LinkEmphasis, SankeyHover } from "../types.ts";


const touchesNode = (link: PositionedLink, nodeId: string): boolean => {
	return link.source.id === nodeId || link.target.id === nodeId;
};

const connects = (link: PositionedLink, first: string, second: string): boolean => {
	const forward = link.source.id === first && link.target.id === second;
	const backward = link.target.id === first && link.source.id === second;

	return forward || backward;
};

const linkEmphasis = (link: PositionedLink, hover: SankeyHover): LinkEmphasis => {
	if (hover === null) {
		return 'normal';
	}

	const active = hover.kind === 'link'
		? hover.key === link.key
		: touchesNode(link, hover.id);

	return active ? 'active' : 'dimmed';
};

const isNodeActive = (node: PositionedNode, hover: SankeyHover, links: PositionedLink[]): boolean => {
	if (hover === null) {
		return true;
	}

	if (hover.kind === 'node') {
		const isHovered = node.id === hover.id;
		const isNeighbour = links.some((link) => connects(link, hover.id, node.id));

		return isHovered || isNeighbour;
	}

	const hoveredLink = links.find((candidate) => candidate.key === hover.key);

	return hoveredLink ? touchesNode(hoveredLink, node.id) : true;
};

export { isNodeActive, linkEmphasis };

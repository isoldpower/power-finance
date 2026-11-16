import type { LaidOutNode, NodeColumn, PositionedNode } from "../../types.ts";


const nodeColumn = (depth: number, maxDepth: number): NodeColumn => {
	if (depth === 0) {
		return 'left';
	}

	if (depth === maxDepth) {
		return 'right';
	}

	return 'middle';
};

const positionNode = (node: LaidOutNode, maxDepth: number): PositionedNode => {
	const left = node.x0 ?? 0;
	const right = node.x1 ?? 0;
	const top = node.y0 ?? 0;
	const bottom = node.y1 ?? 0;

	return {
		key: node.id,
		id: node.id,
		node: node.node,
		x: left,
		y: top,
		width: right - left,
		height: bottom - top,
		value: node.value ?? 0,
		column: nodeColumn(node.depth ?? 0, maxDepth),
	};
};

export { positionNode };

import type { PositionedLink, PositionedNode } from "../../layout";


const collapseNode = (node: PositionedNode): PositionedNode => ({
	...node,
	y: node.y + node.height / 2,
	height: 0,
	value: 0,
});

const collapseLink = (link: PositionedLink): PositionedLink => ({ ...link, width: 0, value: 0 });

export { collapseLink, collapseNode };

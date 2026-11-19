import type { SankeyLink, SankeyNode } from "@visx/sankey";
import type { FlowGraphNode, FlowNode } from "@entity/flow";


type NodeColumn = 'left' | 'middle' | 'right';

interface PositionedNode {
	key: string;
	id: string;
	node: FlowNode;
	x: number;
	y: number;
	width: number;
	height: number;
	value: number;
	column: NodeColumn;
}

interface PositionedLink {
	key: string;
	source: PositionedNode;
	target: PositionedNode;
	sourceX: number;
	sourceY: number;
	targetX: number;
	targetY: number;
	width: number;
	value: number;
}

interface SankeyLayout {
	nodes: PositionedNode[];
	links: PositionedLink[];
}

interface SankeyExtent {
	width: number;
	height: number;
	labelRoom: number;
}

interface LinkValue {
	value: number;
}

type LaidOutNode = SankeyNode<FlowGraphNode, LinkValue>;

type LaidOutLink = SankeyLink<FlowGraphNode, LinkValue>;

export type {
	LaidOutLink,
	LaidOutNode,
	LinkValue,
	NodeColumn,
	PositionedLink,
	PositionedNode,
	SankeyExtent,
	SankeyLayout,
};

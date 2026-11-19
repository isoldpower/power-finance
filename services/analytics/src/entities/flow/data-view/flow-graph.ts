import { parseAmount } from "@internal/shared";

import type { FlowNode, MoneyFlow } from "../types.ts";


interface FlowGraphNode {
	id: string;
	node: FlowNode;
}

interface FlowGraphLink {
	source: string;
	target: string;
	value: number;
}

interface FlowGraph {
	nodes: FlowGraphNode[];
	links: FlowGraphLink[];
}

const toFlowGraph = (flow: MoneyFlow): FlowGraph => ({
	nodes: flow.nodes.map((node) => ({ id: node.id, node })),
	links: flow.links.map((link) => ({
		source: link.source,
		target: link.target,
		value: parseAmount(link.amount.amount),
	})),
});

export { toFlowGraph };
export type { FlowGraph, FlowGraphLink, FlowGraphNode };

import { EMPTY_LAYOUT } from "../config.ts";
import { createSankeyGenerator } from "./graph-partials/create-sankey-generator.ts";
import { positionLink } from "./graph-partials/position-link.ts";
import { positionNode } from "./graph-partials/position-node.ts";

import type { FlowGraph } from "@entity/flow";
import type { SankeyExtent, SankeyLayout } from "../types.ts";


const layoutFlowGraph = (graph: FlowGraph, extent: SankeyExtent): SankeyLayout => {
	if (graph.links.length === 0) {
		return EMPTY_LAYOUT;
	}

	const generator = createSankeyGenerator(extent);
	const laidOut = generator({
		nodes: graph.nodes.map((node) => ({ ...node })),
		links: graph.links.map((link) => ({ ...link })),
	});
	const depths = laidOut.nodes.map((node) => node.depth ?? 0);
	const maxDepth = Math.max(...depths);
	const nodes = laidOut.nodes.map((node) => positionNode(node, maxDepth));
	const nodesById = new Map(nodes.map((node) => [node.id, node]));
	const links = laidOut.links.map((link) => positionLink(link, nodesById));

	return { nodes, links };
};

export { layoutFlowGraph };

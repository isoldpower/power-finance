import { sankey, sankeyJustify } from "@visx/sankey";
import { NODE_PADDING, NODE_WIDTH, VERTICAL_INSET } from "../../config.ts";

import type { FlowGraphNode } from "@entity/flow";
import type { LinkValue, SankeyExtent } from "../../types.ts";


const createSankeyGenerator = (extent: SankeyExtent) => {
	const topLeft: [number, number] = [extent.labelRoom, VERTICAL_INSET];
	const bottomRight: [number, number] = [extent.width - extent.labelRoom, extent.height - VERTICAL_INSET];

	return sankey<FlowGraphNode, LinkValue>()
		.nodeId((node) => node.id)
		.nodeWidth(NODE_WIDTH)
		.nodePadding(NODE_PADDING)
		.nodeAlign(sankeyJustify)
		.extent([topLeft, bottomRight]);
};

export { createSankeyGenerator };

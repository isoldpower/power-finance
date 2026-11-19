import { useMemo } from "react";
import { toFlowGraph } from "@entity/flow";
import { layoutFlowGraph } from "./layout-partials/layout-flow-graph.ts";

import type { MoneyFlow } from "@entity/flow";
import type { SankeyExtent, SankeyLayout } from "./types.ts";


const useSankeyLayout = (flow: MoneyFlow, extent: SankeyExtent): SankeyLayout => {
	const { width, height, labelRoom } = extent;

	const graph = useMemo(() => {
		return toFlowGraph(flow);
	}, [flow]);

	return useMemo(() => {
		return layoutFlowGraph(graph, { width, height, labelRoom });
	}, [graph, width, height, labelRoom]);
};

export { useSankeyLayout };

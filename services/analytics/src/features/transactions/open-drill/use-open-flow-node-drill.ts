import { useCallback } from "react";
import { useAnalyticsFilters, useDimensions } from "@feature/filters";
import { flowNodeDrill } from "./open-drill-partials/flow-node-drill.ts";

import type { FlowNode } from "@entity/flow";


const useOpenFlowNodeDrill = (): ((node: FlowNode) => void) => {
	const openDrill = useAnalyticsFilters((state) => state.openDrill);
	const { dimensions } = useDimensions();

	return useCallback((node: FlowNode) => {
		const drill = flowNodeDrill(node, dimensions?.wallets ?? []);

		if (drill) {
			openDrill(drill);
		}
	}, [openDrill, dimensions]);
};

export { useOpenFlowNodeDrill };

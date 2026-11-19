import { ChartFrame } from "@shared/charts";
import { MoneyFlowPlot } from "./chart-partials/MoneyFlowPlot.tsx";

import type { FC } from "react";
import type { FlowNode, MoneyFlow } from "@entity/flow";


interface MoneyFlowSankeyProps {
	flow: MoneyFlow;
	currency: string;
	expenseColorOf: (key: string) => string;
	onSelectNode: (node: FlowNode) => void;
	height?: number;
}

const MoneyFlowSankey: FC<MoneyFlowSankeyProps> = ({ height = 460, ...props }) => (
	<ChartFrame height={height} label="Money flow from income through wallets into expenses">
		{({ width }) => (
			<MoneyFlowPlot width={width} height={height} {...props} />
		)}
	</ChartFrame>
);

MoneyFlowSankey.displayName = 'MoneyFlowSankey';

export { MoneyFlowSankey };
export type { MoneyFlowSankeyProps };

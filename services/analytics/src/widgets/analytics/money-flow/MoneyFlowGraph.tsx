import type { ReactNode } from "react";
import type { FC } from "react";

import { GridChartCard } from "@entity/analytics";


interface MoneyFlowGraphProps {
	children: ReactNode;
}

const MoneyFlowGraph: FC<MoneyFlowGraphProps> = ({ children }) => {
	return (
		<GridChartCard
			title="Money Flows"
			description="See flows between accounts and wallets"
		>
			{children}
		</GridChartCard>
	);
};

MoneyFlowGraph.displayName = 'MoneyFlowGraph';

export { MoneyFlowGraph };
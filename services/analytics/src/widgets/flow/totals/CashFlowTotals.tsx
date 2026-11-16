import { FlowStat } from "@entity/flow";
import { useMoneyFormat } from "@shared/formatting";

import type { FC } from "react";
import type { CashFlowTotals as CashFlowTotalsModel } from "@entity/flow";


interface CashFlowTotalsProps {
	totals: CashFlowTotalsModel;
}

const CashFlowTotals: FC<CashFlowTotalsProps> = ({ totals }) => {
	const formatMoney = useMoneyFormat();

	return (
		<div className="grid grid-cols-3 gap-4">
			<FlowStat>
				<FlowStat.Label tone="positive">
					Income
				</FlowStat.Label>
				<FlowStat.Value>
					{formatMoney(totals.inflow)}
				</FlowStat.Value>
			</FlowStat>
			<FlowStat>
				<FlowStat.Label tone="negative">
					Expenses
				</FlowStat.Label>
				<FlowStat.Value>
					{formatMoney(totals.outflow)}
				</FlowStat.Value>
			</FlowStat>
			<FlowStat>
				<FlowStat.Label tone="neutral">
					Net
				</FlowStat.Label>
				<FlowStat.Value>
					{formatMoney(totals.net)}
				</FlowStat.Value>
			</FlowStat>
		</div>
	);
};

CashFlowTotals.displayName = 'CashFlowTotals';

export { CashFlowTotals };
export type { CashFlowTotalsProps };

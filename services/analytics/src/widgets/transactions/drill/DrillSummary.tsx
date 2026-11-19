import { DrillPanel } from "@entity/transactions";
import { useMoneyFormat } from "@shared/formatting";

import type { FC } from "react";
import type { DrillTransactions } from "@entity/transactions";


interface DrillSummaryProps {
	transactions: DrillTransactions;
}

const DrillSummary: FC<DrillSummaryProps> = ({ transactions }) => {
	const formatMoney = useMoneyFormat();

	return (
		<DrillPanel.Stats>
			<DrillPanel.Stat label="Income" tone="positive">
				{formatMoney(transactions.totalInflow)}
			</DrillPanel.Stat>
			<DrillPanel.Stat label="Expenses" tone="negative">
				{formatMoney(transactions.totalOutflow)}
			</DrillPanel.Stat>
			<DrillPanel.Stat label="Transactions">
				{transactions.total.toLocaleString()}
			</DrillPanel.Stat>
		</DrillPanel.Stats>
	);
};

DrillSummary.displayName = 'DrillSummary';

export { DrillSummary };
export type { DrillSummaryProps };

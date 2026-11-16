import type { FC, ReactNode } from "react";
import type { DrillTransactions } from "@entity/transactions";


interface ProtectNoTransactionsProps {
	transactions: DrillTransactions;
	empty: ReactNode;
	children: ReactNode;
}

const ProtectNoTransactions: FC<ProtectNoTransactionsProps> = ({ transactions, empty, children }) => {
	if (transactions.transactions.length === 0) {
		return empty;
	}

	return children;
};

ProtectNoTransactions.displayName = 'ProtectNoTransactions';

export { ProtectNoTransactions };
export type { ProtectNoTransactionsProps };

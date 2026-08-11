import { List } from "@shared/pure-components/collections";
import { TransactionsEmptyState } from "@entity/transactions";
import { useTransactionsPaginationContext } from "@feature/transactions";
import { ProtectBrowseSpace } from "@feature/wallets";

import type { FC, ReactNode } from "react";
import type { TransactionPreviewDto } from "@entity/transactions";


interface BrowseTransactionEntriesProps {
	children: (entry: TransactionPreviewDto) => ReactNode;
}

const BrowseTransactionEntries: FC<BrowseTransactionEntriesProps> = ({
	children,
}) => {
	const { paginatedTransactions, from, to } = useTransactionsPaginationContext();
	const pageSize = to - from + 1;
	const ROW_HEIGHT = 56;
	const SEPARATOR_HEIGHT = 1;

	if (paginatedTransactions.length === 0) {
		return (
			<TransactionsEmptyState />
		);
	}

	return (
		<div className="flex flex-col overflow-y-auto" style={{ minHeight: pageSize * ROW_HEIGHT + (pageSize - 1) * SEPARATOR_HEIGHT }}>
			<List className="divide-y divide-border">
				{paginatedTransactions.map((transaction) => children(transaction))}
			</List>
			<ProtectBrowseSpace resources={paginatedTransactions} pageSize={pageSize}>
				This is all we found.
			</ProtectBrowseSpace>
		</div>
	);
}

export { BrowseTransactionEntries };
export type { BrowseTransactionEntriesProps };

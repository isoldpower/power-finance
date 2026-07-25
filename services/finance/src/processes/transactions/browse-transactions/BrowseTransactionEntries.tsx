import type {FC, ReactNode} from "react";
import type {TransactionPreviewDto} from "@entity/transactions";
import {List} from "@shared/components";
import {useTransactionsPaginationContext} from "@feature/transactions/search-and-filtering/TransactionsPaginationContext.tsx";


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
			<div className="px-4 py-[26px] text-center text-[13px] text-text-3">
				No transactions match your filters.
			</div>
		);
	}

	return (
		<div className="flex flex-col overflow-y-auto" style={{ minHeight: pageSize * ROW_HEIGHT + (pageSize - 1) * SEPARATOR_HEIGHT }}>
			<List className="divide-y divide-border">
				{paginatedTransactions.map((transaction) => children(transaction))}
			</List>
			{paginatedTransactions.length < pageSize && (
				<div className="flex min-h-14 flex-1 items-center justify-center border-t border-border px-4 text-[11px] text-text-3">
					This is all we found.
				</div>
			)}
		</div>
	);
}

export { BrowseTransactionEntries };
export type { BrowseTransactionEntriesProps };

import {useCallback, useMemo} from "react";
import { List } from "@shared/pure-components/collections";
import { LedgerViewport, toChainBound } from "@entity/transactions";
import { BrowseTransactionsEmptyUX, useTransactionsPaginationContext } from "@feature/transactions";
import { ProtectBrowseSpace } from "@feature/wallets";

import type { FC, ReactNode } from "react";
import type { ChainBoundTransaction } from "@entity/transactions";


interface BrowseTransactionEntriesProps {
	children: (entry: ChainBoundTransaction) => ReactNode;
}

const BrowseTransactionEntries: FC<BrowseTransactionEntriesProps> = ({
	children,
}) => {
	const { paginatedTransactions, from, to, hasNext, hasPrev } = useTransactionsPaginationContext();
	const boundTransactions = useMemo(() => {
		return toChainBound(paginatedTransactions, {
			continuesBefore: hasPrev,
			continuesAfter: hasNext,
		});
	}, [paginatedTransactions, hasPrev, hasNext]);
	const pageSize = useMemo(() => {
		return to - from + 1;
	}, [from, to]);
	
	const continuesChain = useCallback((entry: ChainBoundTransaction | undefined) => {
		return entry?.position === 'middle' || entry?.position === 'end';
	}, []);

	return (
		<BrowseTransactionsEmptyUX dataset={paginatedTransactions}>
			<LedgerViewport pageSize={pageSize}>
				<List
					className="divide-y divide-border"
					elementProps={(index) => ({
						className: continuesChain(boundTransactions[index]) 
							? 'border-t-transparent' 
							: undefined,
					})}
				>
					{boundTransactions.map((entry) => children(entry))}
				</List>
				<ProtectBrowseSpace resources={paginatedTransactions} pageSize={pageSize}>
					This is all we found.
				</ProtectBrowseSpace>
			</LedgerViewport>
		</BrowseTransactionsEmptyUX>
	);
}

export { BrowseTransactionEntries };
export type { BrowseTransactionEntriesProps };

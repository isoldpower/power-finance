import {FC, useMemo} from "react";
import {TransactionPreviewDto} from "@entity/transactions";

import { useTransactionsSelectionContext } from "@feature/transactions/search-and-filtering/TransactionsSelectionContext.tsx";
import {cn} from "@internal/ui-library";
import {LedgerTransactionRow} from "@widget/transactions/transactions-browser/LedgerTransactionRow.tsx";
import {TransactionLedgerEntries} from "@widget/transactions/transactions-browser/TransactionLedgerEntries.tsx";


interface LedgerBasedTransactionProps {
	transaction: TransactionPreviewDto;
}

const LedgerBasedTransaction: FC<LedgerBasedTransactionProps> = ({ transaction }) => {
	const { selectedTransactionId, selectTransaction } = useTransactionsSelectionContext();

	const expanded = useMemo(() => {
		return selectedTransactionId === transaction.id;
	}, [selectedTransactionId, transaction.id]);

	return (
		<div className={cn("border-b border-border last:border-b-0", expanded && "bg-secondary")}>
			<LedgerTransactionRow
				transaction={transaction}
				expanded={expanded}
				onToggle={() => { selectTransaction(expanded ? null : transaction.id); }}
			/>
			{expanded ? (
				<TransactionLedgerEntries transaction={transaction} />
			) : null}
		</div>
	);
}

export { LedgerBasedTransaction };
export type { LedgerBasedTransactionProps };

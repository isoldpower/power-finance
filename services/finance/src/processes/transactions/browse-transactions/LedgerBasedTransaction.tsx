import { cn } from "@internal/ui-library";
import { useCallback, useMemo } from "react";
import { useTransactionsSelection } from "@feature/transactions";
import { useShallow } from "zustand/react/shallow";
import { LedgerTransactionRow, TransactionLedgerEntries } from "@widget/transactions";

import type { FC, MouseEvent } from "react";
import type { TransactionPreviewDto } from "@entity/transactions";


interface LedgerBasedTransactionProps {
	transaction: TransactionPreviewDto;
}

const LedgerBasedTransaction: FC<LedgerBasedTransactionProps> = ({ transaction }) => {
	const { selectedTransactionId, selectTransaction, checkedTransactionIds, toggleChecked } = useTransactionsSelection(
		useShallow((state) => ({
			selectedTransactionId: state.selectedTransactionId,
			selectTransaction: state.selectTransaction,
			checkedTransactionIds: state.checkedTransactionIds,
			toggleChecked: state.toggleChecked,
		}))
	);

	const expanded = useMemo(() => {
		return selectedTransactionId === transaction.id;
	}, [selectedTransactionId, transaction.id]);
	const checked = useMemo(() => {
		return checkedTransactionIds.includes(transaction.id);
	}, [checkedTransactionIds, transaction.id]);

	const handleCheck = useCallback((event: MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		toggleChecked(transaction.id);
	}, [toggleChecked, transaction.id]);

	return (
		<div className={cn("border-b border-border last:border-b-0", checked && "bg-[var(--accent-soft)]", !checked && expanded && "bg-secondary")}>
			<LedgerTransactionRow
				transaction={transaction}
				expanded={expanded}
				checked={checked}
				onCheck={handleCheck}
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

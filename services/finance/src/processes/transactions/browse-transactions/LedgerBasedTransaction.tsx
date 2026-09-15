import { useCallback, useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import { cn } from "@internal/ui-library";
import { isOptimisticTransactionId, useTransactionsSelection } from "@feature/transactions";
import { TransactionChainRail } from "@entity/transactions";
import { LedgerTransactionRow, TransactionLedgerEntries } from "@widget/transactions";
import { ShowOn } from "@shared/visibility";

import type { FC, MouseEvent } from "react";
import type { ChainBoundTransaction } from "@entity/transactions";


interface LedgerBasedTransactionProps {
	entry: ChainBoundTransaction;
}

const LedgerBasedTransaction: FC<LedgerBasedTransactionProps> = ({ entry }) => {
	const { item: transaction, chain, index, position } = entry;
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
	const pending = useMemo(() => {
		return isOptimisticTransactionId(transaction.id);
	}, [transaction.id]);

	const handleCheck = useCallback((event: MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		if (pending) return;

		toggleChecked(transaction.id);
	}, [pending, toggleChecked, transaction.id]);
	const handleToggle = useCallback(() => {
		if (pending) return;

		selectTransaction(expanded ? null : transaction.id);
	}, [pending, expanded, selectTransaction, transaction.id]);

	return (
		<div 
			className={cn(
				"relative",
				checked && "bg-[var(--accent-soft)]",
				!checked && expanded && "bg-secondary",
				pending && "pointer-events-none opacity-60"
			)}
		>
			<TransactionChainRail position={position} />
			<LedgerTransactionRow
				transaction={transaction}
				chainLink={index === 0 && position !== 'single'}
				chainSize={chain?.size ?? null}
				expanded={expanded}
				checked={checked}
				onCheck={handleCheck}
				onToggle={handleToggle}
			/>
			<ShowOn condition={expanded}>
				<TransactionLedgerEntries transaction={transaction} />
			</ShowOn>
		</div>
	);
}

export { LedgerBasedTransaction };
export type { LedgerBasedTransactionProps };

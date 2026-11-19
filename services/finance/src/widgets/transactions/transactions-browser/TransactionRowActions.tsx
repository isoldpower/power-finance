import { useCallback } from "react";
import { FinanceButton } from "@internal/ui-library";
import { useDeleteTransactions } from "@feature/transactions";
import { SlideOverTrigger } from "@shared/overlays";
import { CancelTransactionModal } from "./row-actions-partials/CancelTransactionModal.tsx";

import type { FC } from "react";
import type { Transaction } from "@entity/transactions";


interface TransactionRowActionsProps {
	transaction: Transaction;
	adjustPanelId: string;
	onCancelled?: () => void;
}

const TransactionRowActions: FC<TransactionRowActionsProps> = ({
	transaction,
	adjustPanelId,
	onCancelled,
}) => {
	const { deleteTransactions, isPending } = useDeleteTransactions();

	const handleConfirmCancel = useCallback((close: () => void) => {
		deleteTransactions([transaction.id], () => {
			close();
			onCancelled?.();
		});
	}, [deleteTransactions, transaction.id, onCancelled]);

	return (
		<div className="flex max-w-[600px] items-center justify-end gap-2 pb-4 pl-[52px] pr-4">
			<SlideOverTrigger asChild={true} panelId={adjustPanelId}>
				<FinanceButton variant="outline" size="sm">
					Adjust
				</FinanceButton>
			</SlideOverTrigger>
			<CancelTransactionModal
				name={transaction.name}
				pending={isPending}
				onConfirm={handleConfirmCancel}
			>
				<FinanceButton variant="danger" size="sm" disabled={isPending}>
					{isPending ? 'Cancelling…' : 'Cancel'}
				</FinanceButton>
			</CancelTransactionModal>
		</div>
	);
};

TransactionRowActions.displayName = 'TransactionRowActions';

export { TransactionRowActions };
export type { TransactionRowActionsProps };

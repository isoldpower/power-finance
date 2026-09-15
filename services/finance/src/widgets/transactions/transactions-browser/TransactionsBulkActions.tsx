import { useCallback } from "react";
import { useShallow } from "zustand/react/shallow";
import { BulkActionsBar } from "@entity/transactions";
import { useDeleteTransactions, useTransactionsSelection } from "@feature/transactions";
import { SpaceOccupant } from "@shared/pure-components/layout";
import { DeleteTransactionsModal } from "./DeleteTransactionsModal.tsx";

import type { FC } from "react";


const TransactionsBulkActions: FC = () => {
	const { checkedTransactionIds, clearChecked } = useTransactionsSelection(
		useShallow((state) => ({
			checkedTransactionIds: state.checkedTransactionIds,
			clearChecked: state.clearChecked,
		}))
	);
	const { deleteTransactions, isPending } = useDeleteTransactions();

	const handleConfirmDelete = useCallback((onDeleted: () => void) => {
		deleteTransactions(checkedTransactionIds, () => {
			clearChecked();
			onDeleted();
		});
	}, [deleteTransactions, checkedTransactionIds, clearChecked]);

	if (checkedTransactionIds.length === 0) {
		return null;
	}

	return (
		<BulkActionsBar>
			<BulkActionsBar.Count>
				{checkedTransactionIds.length} selected
			</BulkActionsBar.Count>
			<BulkActionsBar.Action>
				Recategorize
			</BulkActionsBar.Action>
			<BulkActionsBar.Action>
				Change wallet
			</BulkActionsBar.Action>
			<DeleteTransactionsModal
				count={checkedTransactionIds.length}
				pending={isPending}
				onConfirm={handleConfirmDelete}
			>
				<BulkActionsBar.Action tone="danger">
					{isPending ? 'Deleting…' : 'Delete'}
				</BulkActionsBar.Action>
			</DeleteTransactionsModal>
			<SpaceOccupant />
			<BulkActionsBar.Clear onClick={clearChecked}>
				Clear
			</BulkActionsBar.Clear>
		</BulkActionsBar>
	);
};

TransactionsBulkActions.displayName = 'TransactionsBulkActions';

export { TransactionsBulkActions };

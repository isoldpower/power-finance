import { useShallow } from "zustand/react/shallow";

import { BulkActionsBar } from "@entity/transactions";
import { useTransactionsSelection } from "@feature/transactions";
import { SpaceOccupant } from "@shared/pure-components/layout";

import type { FC } from "react";


const TransactionsBulkActions: FC = () => {
	const { checkedTransactionIds, clearChecked } = useTransactionsSelection(
		useShallow((state) => ({
			checkedTransactionIds: state.checkedTransactionIds,
			clearChecked: state.clearChecked,
		}))
	);

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
			<BulkActionsBar.Action tone="danger">
				Delete
			</BulkActionsBar.Action>
			<SpaceOccupant />
			<BulkActionsBar.Clear onClick={clearChecked}>
				Clear
			</BulkActionsBar.Clear>
		</BulkActionsBar>
	);
};

TransactionsBulkActions.displayName = 'TransactionsBulkActions';

export { TransactionsBulkActions };

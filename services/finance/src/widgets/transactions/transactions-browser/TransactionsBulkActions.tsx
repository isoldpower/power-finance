import { useShallow } from "zustand/react/shallow";

import { BulkActionsBar } from "@entity/transactions";
import { useTransactionsSelection } from "@feature/transactions";

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
		<BulkActionsBar count={checkedTransactionIds.length} onClear={clearChecked} />
	);
};

TransactionsBulkActions.displayName = 'TransactionsBulkActions';

export { TransactionsBulkActions };

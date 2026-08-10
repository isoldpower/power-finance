import { useCallback } from "react";

import { useTransactionsListMethods } from "@feature/transactions";

import { useDeleteGoal } from "../data-presenters";

import type { FC, ReactNode } from "react";
import type { GoalWallet } from "@entity/wallets";


type GoalDispositionMode = 'transfer' | 'spent';

interface GoalDisposition {
	mode: GoalDispositionMode;
	toWalletId: string;
}

interface DeleteGoalApi {
	isPending: boolean;
	deleteGoal: (disposition: GoalDisposition, onDeleted: () => void) => void;
}

interface DeleteGoalDialogProps {
	wallet: GoalWallet;
	children: ((api: DeleteGoalApi) => ReactNode) | ReactNode;
}

const DeleteGoalDialog: FC<DeleteGoalDialogProps> = ({ wallet, children }) => {
	const { meta } = useTransactionsListMethods();
	const deleteGoalMutation = useDeleteGoal();

	const deleteGoal = useCallback((disposition: GoalDisposition, onDeleted: () => void) => {
		const savedAmount = wallet.balance.amount;
		const hasSavings = savedAmount > 0;

		const run = async () => {
			if (hasSavings && disposition.mode === 'transfer' && disposition.toWalletId !== '') {
				await meta.createMutation.mutateAsync({
					data: { source_wallet_id: disposition.toWalletId, amount: savedAmount.toFixed(2) },
				});
			} else if (hasSavings && disposition.mode === 'spent') {
				await meta.createMutation.mutateAsync({
					data: { source_wallet_id: wallet.id, amount: `-${savedAmount.toFixed(2)}` },
				});
			}

			await deleteGoalMutation.mutateAsync(wallet.id);
			onDeleted();
		};

		run().catch(console.error);
	}, [deleteGoalMutation, meta, wallet.balance.amount, wallet.id]);

	const isPending = meta.createMutation.isPending || deleteGoalMutation.isPending;

	return typeof children === 'function'
		? children({ deleteGoal, isPending })
		: children;
}

DeleteGoalDialog.displayName = 'DeleteGoalDialog';

export { DeleteGoalDialog };
export type { DeleteGoalDialogProps, DeleteGoalApi, GoalDisposition, GoalDispositionMode };

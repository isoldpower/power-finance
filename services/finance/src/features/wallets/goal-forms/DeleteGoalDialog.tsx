import { useCallback } from "react";

import { useTransactionsListMethods } from "@feature/transactions";

import { useDeleteGoal } from "../data-presenters";

import type { FC, ReactNode } from "react";
import type { Goal, GoalDisposition } from "@entity/wallets";


interface DeleteGoalApi {
	isPending: boolean;
	deleteGoal: (disposition: GoalDisposition, onDeleted: () => void) => void;
}

interface DeleteGoalDialogProps {
	goal: Goal;
	children: ((api: DeleteGoalApi) => ReactNode) | ReactNode;
}

const DeleteGoalDialog: FC<DeleteGoalDialogProps> = ({ goal, children }) => {
	const { createTransaction, createTransactionChain, meta } = useTransactionsListMethods();
	const deleteGoalMutation = useDeleteGoal();

	const deleteGoal = useCallback((disposition: GoalDisposition, onDeleted: () => void) => {
		const saved = goal.progress.amount;
		const hasSavings = saved > 0;

		const run = async () => {
			if (hasSavings && disposition.mode === 'transfer' && disposition.toWalletId !== '') {
				await createTransactionChain({
					entries: [
						{
							temporaryId: 'goal-drain-out',
							after: null,
							name: goal.name,
							currency: goal.currency,
							amount: saved,
							walletId: goal.id,
							origin: 'manual',
							type: 'expense',
							category: null,
							evidence: null,
						},
						{
							temporaryId: 'goal-drain-in',
							after: 'goal-drain-out',
							name: goal.name,
							currency: goal.currency,
							amount: saved,
							walletId: disposition.toWalletId,
							origin: 'manual',
							type: 'income',
							category: null,
							evidence: null,
						},
					],
				});
			} else if (hasSavings && disposition.mode === 'spent') {
				await createTransaction({
					name: goal.name,
					currency: goal.currency,
					amount: saved,
					walletId: goal.id,
					origin: 'manual',
					type: 'expense',
					category: null,
					evidence: null,
				});
			}

			await deleteGoalMutation.mutateAsync(goal.id);
			onDeleted();
		};

		run().catch(console.error);
	}, [createTransaction, createTransactionChain, deleteGoalMutation, goal]);

	const isPending = meta.createMutation.isPending
		|| meta.chainMutation.isPending
		|| deleteGoalMutation.isPending;

	return typeof children === 'function'
		? children({ deleteGoal, isPending })
		: children;
}

DeleteGoalDialog.displayName = 'DeleteGoalDialog';

export { DeleteGoalDialog };
export type { DeleteGoalDialogProps, DeleteGoalApi };

import { useMemo } from "react";
import { GoalDialog, WalletSelectField } from "@entity/wallets";
import { useGoalDisposition } from "@feature/wallets";
import { ConfirmModal } from "@shared/overlays";
import { ShowOn } from "@shared/visibility";
import { Text } from "@shared/pure-components/typography";
import { DeleteGoalActions } from "./disposition/DeleteGoalActions.tsx";
import { DeleteGoalSummary } from "./disposition/DeleteGoalSummary.tsx";
import { GoalDispositionOption } from "./disposition/GoalDispositionOption.tsx";

import type { FC, ReactNode } from "react";
import type { Goal, GoalDisposition } from "@entity/wallets";


interface DeleteGoalModalProps {
	goal: Goal;
	pending: boolean;
	onConfirm: (disposition: GoalDisposition, onDeleted: () => void) => void;
	children: ReactNode;
}

const DeleteGoalModal: FC<DeleteGoalModalProps> = ({ goal, pending, onConfirm, children }) => {
	const {
		mode,
		hasSavings,
		savedAmount,
		walletOptions,
		selectedWallet,
		disposition,
		transferReady,
		selectMode,
		selectWallet,
		reset,
	} = useGoalDisposition(goal);

	const transferring = useMemo(() => {
		return mode === 'transfer' && hasSavings;
	}, [hasSavings, mode]);
	const confirmLabel = useMemo(() => {
		return pending ? 'Deleting…' : transferring ? 'Transfer & delete' : 'Delete goal';
	}, [pending, transferring])

	return (
		<ConfirmModal trigger={children} className="w-[440px] p-6" onClose={reset}>
			{({ close }) => (
				<GoalDialog>
					<DeleteGoalSummary title="Delete goal">
						<ShowOn condition={hasSavings}>
							<Text>
								“{goal.name}” has <Text weight="semibold" tone="strong">{savedAmount}</Text> saved.
								Choose what happens to it.
							</Text>
						</ShowOn>
						<ShowOn condition={!hasSavings}>
							<Text>
								Permanently delete “{goal.name}”? This can’t be undone.
							</Text>
						</ShowOn>
					</DeleteGoalSummary>
					<ShowOn condition={hasSavings}>
						<GoalDialog.Options role="radiogroup" aria-label="What happens to the saved money">
							<GoalDispositionOption
								title="Transfer to a wallet"
								description={`Move the ${savedAmount} you saved into an account`}
								selected={mode === 'transfer'}
								onSelect={() => { selectMode('transfer'); }}
							/>
							<ShowOn condition={mode === 'transfer'}>
								<WalletSelectField
									options={walletOptions}
									selected={selectedWallet}
									emptyLabel="No wallets to receive funds"
									placeholder="Select wallet"
									className="ml-7 w-auto"
									onSelect={selectWallet}
								/>
							</ShowOn>
							<GoalDispositionOption
								title="Mark as spent"
								description="The money was used — close this goal as fulfilled"
								selected={mode === 'spent'}
								onSelect={() => { selectMode('spent'); }}
							/>
						</GoalDialog.Options>
					</ShowOn>
					<DeleteGoalActions
						cancelLabel="Cancel"
						confirmLabel={confirmLabel}
						confirmDisabled={!transferReady || pending}
						onCancel={close}
						onConfirm={() => { onConfirm(disposition, close); }}
					/>
				</GoalDialog>
			)}
		</ConfirmModal>
	);
};

DeleteGoalModal.displayName = 'DeleteGoalModal';

export { DeleteGoalModal };
export type { DeleteGoalModalProps };

import { useCallback, useEffect, useState } from "react";
import { FinanceButton } from "@internal/ui-library";

import { GoalDialog, toWalletSelectOptions, WalletSelect } from "@entity/wallets";
import { useWalletsList } from "@feature/wallets";
import { ConfirmModal } from "@shared/interactions";
import { DangerIconBadge } from "@shared/components";
import { useLocaleCurrency } from "@shared/utils";

import type { FC, ReactNode } from "react";
import type { GoalWallet } from "@entity/wallets";
import type { GoalDisposition, GoalDispositionMode } from "@feature/wallets";


interface DeleteGoalModalProps {
	wallet: GoalWallet;
	pending: boolean;
	onConfirm: (disposition: GoalDisposition, onDeleted: () => void) => void;
	children: ReactNode;
}

const DeleteGoalModal: FC<DeleteGoalModalProps> = ({ wallet, pending, onConfirm, children }) => {
	const { wallets } = useWalletsList();
	const formatCurrency = useLocaleCurrency();

	const savedAmount = wallet.balance.amount;
	const hasSavings = savedAmount > 0;
	const saved = formatCurrency(savedAmount, wallet.balance.currency);

	const [mode, setMode] = useState<GoalDispositionMode>(hasSavings ? 'transfer' : 'spent');
	const [toWalletId, setToWalletId] = useState('');

	useEffect(() => {
		if (wallets.length === 0) return;
		setToWalletId((previous) => previous || wallets[0].id);
	}, [wallets]);

	const resetMode = useCallback(() => {
		setMode(hasSavings ? 'transfer' : 'spent');
	}, [hasSavings]);

	const transferReady = mode !== 'transfer' || !hasSavings || toWalletId !== '';
	const canConfirm = transferReady && !pending;

	return (
		<ConfirmModal trigger={children} className="w-[440px] p-6" onClose={resetMode}>
			{({ close }) => (
				<>
					<GoalDialog.Header>
						<DangerIconBadge className="size-10 flex-none" iconSize={20} />
						<GoalDialog.Content>
							<GoalDialog.Title>
								Delete goal
							</GoalDialog.Title>
							<GoalDialog.Description>
								{hasSavings
									? <>“{wallet.name}” has <span className="font-semibold text-foreground">{saved}</span> saved. Choose what happens to it.</>
									: <>Permanently delete “{wallet.name}”? This can’t be undone.</>}
							</GoalDialog.Description>
						</GoalDialog.Content>
					</GoalDialog.Header>
					{hasSavings ? (
						<GoalDialog.Options role="radiogroup" aria-label="What happens to the saved money">
							<GoalDialog.Option
								selected={mode === 'transfer'}
								onClick={() => { setMode('transfer'); }}
							>
								<GoalDialog.Radio selected={mode === 'transfer'} />
								<GoalDialog.Content>
									<GoalDialog.OptionTitle>
										Transfer to a wallet
									</GoalDialog.OptionTitle>
									<GoalDialog.OptionHint>
										Move the {saved} you saved into an account
									</GoalDialog.OptionHint>
								</GoalDialog.Content>
							</GoalDialog.Option>
							{mode === 'transfer' ? (
								<WalletSelect
									options={toWalletSelectOptions(wallets)}
									value={toWalletId}
									onChange={setToWalletId}
									emptyLabel="No wallets to receive funds"
									className="ml-7 w-auto"
								/>
							) : null}
							<GoalDialog.Option
								selected={mode === 'spent'}
								onClick={() => { setMode('spent'); }}
							>
								<GoalDialog.Radio selected={mode === 'spent'} />
								<GoalDialog.Content>
									<GoalDialog.OptionTitle>
										Mark as spent
									</GoalDialog.OptionTitle>
									<GoalDialog.OptionHint>
										The money was used — close this goal as fulfilled
									</GoalDialog.OptionHint>
								</GoalDialog.Content>
							</GoalDialog.Option>
						</GoalDialog.Options>
					) : null}
					<GoalDialog.Actions>
						<FinanceButton type="button" size="lg" variant="outline" className="flex-1" onClick={close}>
							Cancel
						</FinanceButton>
						<FinanceButton
							type="button"
							size="lg"
							variant="danger"
							className="flex-1 border-transparent bg-neg text-white shadow-[var(--shadow)] hover:bg-neg hover:brightness-95"
							disabled={!canConfirm}
							onClick={() => { onConfirm({ mode, toWalletId }, close); }}
						>
							{pending ? 'Deleting…' : mode === 'transfer' && hasSavings ? 'Transfer & delete' : 'Delete goal'}
						</FinanceButton>
					</GoalDialog.Actions>
				</>
			)}
		</ConfirmModal>
	);
};

DeleteGoalModal.displayName = 'DeleteGoalModal';

export { DeleteGoalModal };
export type { DeleteGoalModalProps };

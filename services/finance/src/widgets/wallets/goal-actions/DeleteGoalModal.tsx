import { useCallback, useEffect, useState } from "react";
import { FinanceButton } from "@internal/ui-library";

import { GoalDialog, toWalletSelectOptions, WalletSelect } from "@entity/wallets";
import { useWalletsList } from "@feature/wallets";
import { ConfirmModal } from "@shared/overlays";
import { BodyText, Heading, RowTitle, Text } from "@shared/pure-components/typography";
import { DangerIconBadge } from "@shared/pure-components/badges";
import { useLocaleCurrency } from "@shared/formatting";

import type { FC, ReactNode } from "react";
import type { GoalWallet } from "@entity/wallets";
import type { GoalDisposition, GoalDispositionMode } from "@entity/wallets";


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
							<Heading>
								Delete goal
							</Heading>
							<GoalDialog.Description>
								{hasSavings
									? <>“{wallet.name}” has <Text weight="semibold" tone="strong">{saved}</Text> saved. Choose what happens to it.</>
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
									<RowTitle size="13">
										Transfer to a wallet
									</RowTitle>
									<BodyText size="11.5">
										Move the {saved} you saved into an account
									</BodyText>
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
									<RowTitle size="13">
										Mark as spent
									</RowTitle>
									<BodyText size="11.5">
										The money was used — close this goal as fulfilled
									</BodyText>
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

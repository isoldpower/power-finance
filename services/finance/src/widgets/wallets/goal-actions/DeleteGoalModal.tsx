import { useCallback, useEffect, useState } from "react";
import { FinanceButton } from "@internal/ui-library";

import { GoalDialog, toWalletSelectOptions, WalletSelect } from "@entity/wallets";
import { useWalletsList } from "@feature/wallets";
import { ConfirmModal } from "@shared/overlays";
import { BodyText, Heading, RowTitle, Text } from "@shared/pure-components/typography";
import { DangerIconBadge } from "@shared/pure-components/badges";
import { useLocaleCurrency } from "@shared/formatting";

import type { FC, ReactNode } from "react";
import type { Goal } from "@entity/wallets";
import type { GoalDisposition, GoalDispositionMode } from "@entity/wallets";


interface DeleteGoalModalProps {
	goal: Goal;
	pending: boolean;
	onConfirm: (disposition: GoalDisposition, onDeleted: () => void) => void;
	children: ReactNode;
}

const DeleteGoalModal: FC<DeleteGoalModalProps> = ({ goal, pending, onConfirm, children }) => {
	const { wallets } = useWalletsList();
	const formatCurrency = useLocaleCurrency();

	const walletOptions = toWalletSelectOptions(wallets);
	const savedAmount = goal.progress.amount;
	const hasSavings = savedAmount > 0;
	const saved = formatCurrency(savedAmount, goal.progress.currency);

	const [mode, setMode] = useState<GoalDispositionMode>(hasSavings ? 'transfer' : 'spent');
	const [toWalletId, setToWalletId] = useState('');
	const selectedWallet = walletOptions.find((option) => option.id === toWalletId);

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
				<GoalDialog>
					<GoalDialog.Header>
						<DangerIconBadge className="size-10 flex-none" iconSize={20} />
						<GoalDialog.Content>
							<Heading>
								Delete goal
							</Heading>
							<GoalDialog.Description>
								{hasSavings ? (
									<>
										“{goal.name}” has <Text weight="semibold" tone="strong">{saved}</Text> saved.
										Choose what happens to it.
									</>
								) : (
									<>Permanently delete “{goal.name}”? This can’t be undone.</>
								)}
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
								<WalletSelect>
									<WalletSelect.Trigger className="ml-7 w-auto">
										{selectedWallet ? (
											<WalletSelect.Swatch gradient={selectedWallet.gradient} />
										) : null}
										<WalletSelect.Value placeholder={!selectedWallet}>
											{selectedWallet ? selectedWallet.name : 'Select wallet'}
										</WalletSelect.Value>
										{selectedWallet ? (
											<WalletSelect.Currency>
												{selectedWallet.currency}
											</WalletSelect.Currency>
										) : null}
										<WalletSelect.Caret />
									</WalletSelect.Trigger>
									<WalletSelect.Options>
										{walletOptions.length === 0 ? (
											<WalletSelect.Empty>
												No wallets to receive funds
											</WalletSelect.Empty>
										) : (
											walletOptions.map((option) => (
												<WalletSelect.Option
													key={option.id}
													onSelect={() => { setToWalletId(option.id); }}
												>
													<WalletSelect.Swatch gradient={option.gradient} />
													<WalletSelect.OptionName>
														{option.name}
													</WalletSelect.OptionName>
													<WalletSelect.Currency size="10.5">
														{option.currency}
													</WalletSelect.Currency>
													{option.id === toWalletId ? <WalletSelect.Selected /> : null}
												</WalletSelect.Option>
											))
										)}
									</WalletSelect.Options>
								</WalletSelect>
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
				</GoalDialog>
			)}
		</ConfirmModal>
	);
};

DeleteGoalModal.displayName = 'DeleteGoalModal';

export { DeleteGoalModal };
export type { DeleteGoalModalProps };

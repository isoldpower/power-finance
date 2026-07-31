import type { FC, ReactNode } from "react";
import { useEffect, useState } from "react";
import { cn, FinanceButton } from "@internal/ui-library";

import { useWalletsList } from "@feature/wallets";
import { useTransactionsListMethods } from "@feature/transactions";
import { useDeleteGoal } from "@feature/wallets";
import { WalletSelect } from "@entity/wallets";
import { ConfirmModal } from "@shared/interactions";
import { DangerIconBadge } from "@shared/components";
import { useLocaleCurrency } from "@shared/utils";

import type { GoalWallet } from "@entity/wallets";

type Disposition = 'transfer' | 'spent';

interface DeleteGoalDialogProps {
	wallet: GoalWallet;
	children: ReactNode;
}

const DeleteGoalDialog: FC<DeleteGoalDialogProps> = ({ wallet, children }) => {
	const { wallets } = useWalletsList();
	const { meta } = useTransactionsListMethods();
	const deleteGoal = useDeleteGoal();
	const formatCurrency = useLocaleCurrency();

	const { id, name } = wallet;
	const savedAmount = wallet.balance.amount;
	const saved = formatCurrency(savedAmount, wallet.balance.currency);
	const hasSavings = savedAmount > 0;

	const [mode, setMode] = useState<Disposition>(hasSavings ? 'transfer' : 'spent');
	const [toWalletId, setToWalletId] = useState('');

	useEffect(() => {
		if (wallets.length === 0) return;
		setToWalletId((prev) => prev || wallets[0].id);
	}, [wallets]);

	const walletOptions = wallets.map((wallet) => ({ id: wallet.id, name: wallet.name, currency: wallet.balance.currency, gradient: wallet.color }));

	const pending = meta.createMutation.isPending || deleteGoal.isPending;
	const transferReady = mode !== 'transfer' || !hasSavings || toWalletId !== '';
	const canConfirm = transferReady && !pending;

	const optionBase = "flex w-full items-start gap-3 rounded-[var(--radius-md)] border px-3.5 py-2.5 text-left transition-colors";

	const radio = (selected: boolean): ReactNode => (
		<span className={cn(
			"mt-0.5 flex size-4 flex-none items-center justify-center rounded-full border-2",
			selected ? "border-primary" : "border-border-strong"
		)}>
			{selected ? <span className="size-2 rounded-full bg-primary" /> : null}
		</span>
	);

	return (
		<ConfirmModal
			trigger={children}
			className="w-[440px] p-6"
			onClose={() => { setMode(hasSavings ? 'transfer' : 'spent'); }}
		>
			{({ close }) => {
				const onConfirm = async () => {
					if (mode === 'transfer' && hasSavings && toWalletId !== '') {
						await meta.createMutation.mutateAsync({ data: { source_wallet_id: toWalletId, amount: savedAmount.toFixed(2) } });
					} else if (mode === 'spent' && hasSavings) {
						await meta.createMutation.mutateAsync({ data: { source_wallet_id: id, amount: `-${savedAmount.toFixed(2)}` } });
					}
					await deleteGoal.mutateAsync(id);
					close();
				};

				return (
					<>
						<div className="flex items-start gap-3">
							<DangerIconBadge className="size-10 flex-none" iconSize={20} />
							<div className="min-w-0 flex-1">
								<h2 className="font-display text-[17px] font-semibold">Delete goal</h2>
								<p className="mt-1 text-[13px] leading-relaxed text-text-2">
									{hasSavings
										? <>“{name}” has <span className="font-semibold text-foreground">{saved}</span> saved. Choose what happens to it.</>
										: <>Permanently delete “{name}”? This can’t be undone.</>}
								</p>
							</div>
						</div>

						{hasSavings ? (
							<div className="mt-4 space-y-2" role="radiogroup" aria-label="What happens to the saved money">
								<button
									type="button"
									role="radio"
									aria-checked={mode === 'transfer'}
									onClick={() => { setMode('transfer'); }}
									className={cn(optionBase, mode === 'transfer' ? "border-primary bg-[var(--accent-soft)]" : "border-border-strong hover:bg-secondary")}
								>
									{radio(mode === 'transfer')}
									<div className="min-w-0 flex-1">
										<div className="text-[13px] font-semibold">Transfer to a wallet</div>
										<div className="text-[11.5px] text-text-2">Move the {saved} you saved into an account</div>
									</div>
								</button>

								{mode === 'transfer' ? (
									<WalletSelect
										options={walletOptions}
										value={toWalletId}
										onChange={setToWalletId}
										emptyLabel="No wallets to receive funds"
										className="ml-7 w-auto"
									/>
								) : null}

								<button
									type="button"
									role="radio"
									aria-checked={mode === 'spent'}
									onClick={() => { setMode('spent'); }}
									className={cn(optionBase, mode === 'spent' ? "border-primary bg-[var(--accent-soft)]" : "border-border-strong hover:bg-secondary")}
								>
									{radio(mode === 'spent')}
									<div className="min-w-0 flex-1">
										<div className="text-[13px] font-semibold">Mark as spent</div>
										<div className="text-[11.5px] text-text-2">The money was used — close this goal as fulfilled</div>
									</div>
								</button>
							</div>
						) : null}

						<div className="mt-5 flex gap-2.5">
							<FinanceButton type="button" size="lg" variant="outline" className="flex-1" onClick={close}>
								Cancel
							</FinanceButton>
							<FinanceButton
								type="button"
								size="lg"
								variant="danger"
								className="flex-1 border-transparent bg-neg text-white shadow-[var(--shadow)] hover:bg-neg hover:brightness-95"
								disabled={!canConfirm}
								onClick={() => { void onConfirm(); }}
							>
								{pending ? 'Deleting…' : mode === 'transfer' && hasSavings ? 'Transfer & delete' : 'Delete goal'}
							</FinanceButton>
						</div>
					</>
				);
			}}
		</ConfirmModal>
	);
};

DeleteGoalDialog.displayName = 'DeleteGoalDialog';

export { DeleteGoalDialog };
export type { DeleteGoalDialogProps };

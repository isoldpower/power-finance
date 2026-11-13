import { useMemo } from "react";
import { cn, FinanceButton } from "@internal/ui-library";
import { GoalDialog } from "@entity/wallets";
import { useWalletLeftover } from "@feature/wallets";
import { WalletCombobox } from "@widget/wallets/wallet-select";
import { ConfirmModal } from "@shared/overlays";
import { ShowOn } from "@shared/visibility";
import { DangerIconBadge } from "@shared/pure-components/badges";
import { Caption, Heading, Text } from "@shared/pure-components/typography";

import type { FC, ReactNode } from "react";
import type { Wallet, WalletLeftoverTransfer } from "@entity/wallets";


interface DeleteWalletModalProps {
	wallet: Wallet;
	pending: boolean;
	onConfirm: (transfer: WalletLeftoverTransfer | null, onDeleted: () => void) => void;
	children: ReactNode;
}

const DeleteWalletModal: FC<DeleteWalletModalProps> = ({ wallet, pending, onConfirm, children }) => {
	const {
		hasLeftover,
		inDebt,
		leftover,
		walletOptions,
		selectedWallet,
		crossCurrency,
		received,
		transfer,
		deleteReady,
		selectWallet,
		reset,
	} = useWalletLeftover(wallet);

	const confirmLabel = useMemo(() => {
		if (pending) return 'Deleting…';

		return hasLeftover ? 'Transfer & delete' : 'Delete wallet';
	}, [pending, hasLeftover]);

	return (
		<ConfirmModal trigger={children} className="w-[440px] p-6" onClose={reset}>
			{({ close }) => (
				<GoalDialog>
					<GoalDialog.Header>
						<DangerIconBadge className="size-10 flex-none" iconSize={20} />
						<GoalDialog.Content>
							<Heading>
								Delete wallet
							</Heading>
							<GoalDialog.Description>
								<ShowOn condition={hasLeftover}>
									<Text>
										“{wallet.name}” still holds <Text weight="semibold" tone="strong">{leftover}</Text>.
										Choose a wallet to receive it before deleting.
									</Text>
								</ShowOn>
								<ShowOn condition={inDebt}>
									<Text>
										“{wallet.name}” is overdrawn by <Text weight="semibold" tone="strong">{leftover}</Text>.
										Settle the balance before deleting the wallet.
									</Text>
								</ShowOn>
								<ShowOn condition={!hasLeftover && !inDebt}>
									<Text>
										Permanently delete “{wallet.name}”? This can’t be undone.
									</Text>
								</ShowOn>
							</GoalDialog.Description>
						</GoalDialog.Content>
					</GoalDialog.Header>
					<ShowOn condition={hasLeftover}>
						<GoalDialog.Options aria-label="Wallet receiving the leftover money">
							<WalletCombobox
								options={walletOptions}
								selected={selectedWallet}
								emptyLabel="No other wallets to receive funds"
								placeholder="Select wallet"
								onSelect={selectWallet}
							/>
							<ShowOn condition={crossCurrency && transfer !== null}>
								<Caption size="12">
									Arrives as ≈ {received} at the current rate
								</Caption>
							</ShowOn>
						</GoalDialog.Options>
					</ShowOn>
					<GoalDialog.Actions>
						<FinanceButton type="button" size="lg" variant="outline" className="flex-1" onClick={close}>
							Cancel
						</FinanceButton>
						<FinanceButton
							type="button"
							size="lg"
							variant="danger"
							className={cn(
								"flex-1 border-transparent bg-neg text-white shadow-[var(--shadow)]",
								"hover:bg-neg hover:brightness-95"
							)}
							disabled={!deleteReady || pending}
							onClick={() => { onConfirm(transfer, close); }}
						>
							{confirmLabel}
						</FinanceButton>
					</GoalDialog.Actions>
				</GoalDialog>
			)}
		</ConfirmModal>
	);
};

DeleteWalletModal.displayName = 'DeleteWalletModal';

export { DeleteWalletModal };
export type { DeleteWalletModalProps };

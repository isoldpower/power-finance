import { useCallback } from "react";
import { useTransactionsListMethods } from "@feature/transactions";
import { useWalletMethods } from "../data-presenters";

import type { FC, ReactNode } from "react";
import type { Wallet, WalletLeftoverTransfer } from "@entity/wallets";


const LEFTOVER_TRANSFER_NAME = 'Wallet closure';

interface DeleteWalletApi {
	isPending: boolean;
	deleteWallet: (transfer: WalletLeftoverTransfer | null, onDeleted: () => void) => void;
}

interface DeleteWalletDialogProps {
	wallet: Wallet;
	children: ((api: DeleteWalletApi) => ReactNode) | ReactNode;
}

const DeleteWalletDialog: FC<DeleteWalletDialogProps> = ({ wallet, children }) => {
	const { createTransactionChain, meta: transactionsMeta } = useTransactionsListMethods();
	const { meta } = useWalletMethods(wallet.id);
	const { deleteMutation } = meta;

	const deleteWallet = useCallback((
		transfer: WalletLeftoverTransfer | null,
		onDeleted: () => void,
	) => {
		const run = async () => {
			if (transfer !== null) {
				await createTransactionChain({
					entries: [
						{
							temporaryId: 'wallet-leftover-out',
							after: null,
							name: LEFTOVER_TRANSFER_NAME,
							currency: wallet.balance.currency,
							amount: wallet.balance.amount,
							walletId: wallet.id,
							origin: 'manual',
							type: 'expense',
							category: null,
							evidence: null,
						},
						{
							temporaryId: 'wallet-leftover-in',
							after: 'wallet-leftover-out',
							name: LEFTOVER_TRANSFER_NAME,
							currency: transfer.toCurrency,
							amount: transfer.receiveAmount,
							walletId: transfer.toWalletId,
							origin: 'manual',
							type: 'income',
							category: null,
							evidence: null,
						},
					],
				});
			}

			await deleteMutation.mutateAsync(wallet.id);
			onDeleted();
		};

		run().catch(console.error);
	}, [createTransactionChain, deleteMutation, wallet.balance.amount, wallet.balance.currency, wallet.id]);

	const isPending = transactionsMeta.chainMutation.isPending || deleteMutation.isPending;

	return typeof children === 'function'
		? children({ deleteWallet, isPending })
		: children;
}

DeleteWalletDialog.displayName = 'DeleteWalletDialog';

export { DeleteWalletDialog };
export type { DeleteWalletDialogProps, DeleteWalletApi };

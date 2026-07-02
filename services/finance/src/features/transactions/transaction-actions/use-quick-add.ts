import { useEffect, useState } from "react";

import { useWalletsList } from "@feature/wallets";
import { DEFAULT_WALLET_GRADIENT } from "@entity/wallets";
import type { WalletSelectOption } from "@entity/wallets";

import { useTransactionsListMethods } from "../data-presenters";


type QuickAddType = 'expense' | 'income' | 'transfer';

const useQuickAdd = () => {
	const { wallets } = useWalletsList();
	const { createTransaction, meta } = useTransactionsListMethods();

	const [type, setType] = useState<QuickAddType>('expense');
	const [amount, setAmount] = useState('');
	const [walletId, setWalletId] = useState('');
	const [toWalletId, setToWalletId] = useState('');

	useEffect(() => {
		if (wallets.length === 0) return;
		setWalletId((prev) => prev || wallets[0].id);
		setToWalletId((prev) => prev || (wallets.find((wallet) => wallet.id !== wallets[0].id)?.id ?? ''));
	}, [wallets]);

	const isTransfer = type === 'transfer';
	const currency = wallets.find((wallet) => wallet.id === walletId)?.balance.currency ?? 'USD';
	const walletOptions: WalletSelectOption[] = wallets.map((wallet) => ({ id: wallet.id, name: wallet.name, currency: wallet.balance.currency, gradient: DEFAULT_WALLET_GRADIENT }));
	const numericAmount = parseFloat(amount);
	const amountValid = !Number.isNaN(numericAmount) && numericAmount > 0;
	const transferValid = !isTransfer || (toWalletId !== '' && toWalletId !== walletId);
	const canSubmit = walletId !== '' && amountValid && transferValid && !meta.createMutation.isPending;
	const isPending = meta.createMutation.isPending;

	const onAdd = () => {
		if (!canSubmit) return;
		const abs = Math.abs(numericAmount).toFixed(2);

		if (isTransfer) {
			Promise.all([
				meta.createMutation.mutateAsync({ data: { source_wallet_id: walletId, amount: `-${abs}` } }),
				meta.createMutation.mutateAsync({ data: { source_wallet_id: toWalletId, amount: abs } }),
			]).then(() => { setAmount(''); }).catch((error: unknown) => { console.error(error); });
			return;
		}

		const signed = type === 'income' ? abs : `-${abs}`;
		createTransaction({ source_wallet_id: walletId, amount: signed });
		setAmount('');
	};

	return {
		type,
		setType,
		amount,
		setAmount,
		walletId,
		setWalletId,
		toWalletId,
		setToWalletId,
		isTransfer,
		currency,
		walletOptions,
		canSubmit,
		isPending,
		onAdd,
	};
};

export { useQuickAdd };
export type { QuickAddType };

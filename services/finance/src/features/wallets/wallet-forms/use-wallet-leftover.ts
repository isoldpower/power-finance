import { useCallback, useMemo, useState } from "react";
import { selectedWalletOption, toWalletSelectOptions } from "@entity/wallets";
import { useCurrencyPairRate } from "@feature/localization";
import {
	compareAmounts,
	currencyFractionDigits,
	multiplyAmount,
	useLocaleCurrency,
	ZERO_AMOUNT,
} from "@internal/shared";
import { isOptimisticWalletId, useWalletsList } from "../data-presenters";

import type { Wallet, WalletLeftoverTransfer, WalletSelectItem } from "@entity/wallets";


interface UseWalletLeftoverReturn {
	hasLeftover: boolean;
	inDebt: boolean;
	leftover: string;
	walletOptions: WalletSelectItem[];
	selectedWallet: WalletSelectItem | undefined;
	crossCurrency: boolean;
	received: string;
	transfer: WalletLeftoverTransfer | null;
	deleteReady: boolean;
	selectWallet: (walletId: string) => void;
	reset: () => void;
}

const useWalletLeftover = (wallet: Wallet): UseWalletLeftoverReturn => {
	const { wallets } = useWalletsList();
	const formatCurrency = useLocaleCurrency();
	const [chosenWalletId, setChosenWalletId] = useState('');

	const { amount, currency } = wallet.balance;
	const comparison = compareAmounts(amount, ZERO_AMOUNT);
	const hasLeftover = comparison > 0;
	const inDebt = comparison < 0;

	const walletOptions = useMemo(() => {
		return toWalletSelectOptions(wallets.filter((candidate) => {
			return candidate.id !== wallet.id && !isOptimisticWalletId(candidate.id);
		}));
	}, [wallets, wallet.id]);

	const toWalletId = useMemo(() => {
		const chosen = selectedWalletOption(walletOptions, chosenWalletId);

		return chosen?.id ?? walletOptions.at(0)?.id ?? '';
	}, [walletOptions, chosenWalletId]);

	const selectedWallet = useMemo(() => {
		return selectedWalletOption(walletOptions, toWalletId);
	}, [walletOptions, toWalletId]);

	const toCurrency = selectedWallet?.currency ?? currency;
	const { rate, isPending: ratePending } = useCurrencyPairRate(currency, toCurrency);

	const receiveAmount = useMemo(() => {
		return multiplyAmount(amount, rate, currencyFractionDigits(toCurrency));
	}, [amount, rate, toCurrency]);

	const transfer = useMemo((): WalletLeftoverTransfer | null => {
		if (!hasLeftover || toWalletId === '' || ratePending) return null;

		return { toWalletId, toCurrency, receiveAmount };
	}, [hasLeftover, toWalletId, ratePending, toCurrency, receiveAmount]);

	const reset = useCallback(() => {
		setChosenWalletId('');
	}, []);

	return {
		hasLeftover,
		inDebt,
		leftover: formatCurrency(amount, currency),
		walletOptions,
		selectedWallet,
		crossCurrency: toCurrency !== currency,
		received: formatCurrency(receiveAmount, toCurrency),
		transfer,
		deleteReady: !inDebt && (!hasLeftover || transfer !== null),
		selectWallet: setChosenWalletId,
		reset,
	};
};

export { useWalletLeftover };
export type { UseWalletLeftoverReturn };

import { useCallback, useEffect, useMemo, useState } from "react";

import { selectedWalletOption, toWalletSelectOptions } from "@entity/wallets";
import { useLocaleCurrency } from "@shared/formatting";
import { useWalletsList } from "../data-presenters";

import type { Goal, GoalDisposition, GoalDispositionMode, WalletSelectItem } from "@entity/wallets";


interface UseGoalDispositionReturn {
	mode: GoalDispositionMode;
	hasSavings: boolean;
	savedAmount: string;
	walletOptions: WalletSelectItem[];
	selectedWallet: WalletSelectItem | undefined;
	disposition: GoalDisposition;
	transferReady: boolean;
	selectMode: (mode: GoalDispositionMode) => void;
	selectWallet: (walletId: string) => void;
	reset: () => void;
}

const useGoalDisposition = (goal: Goal): UseGoalDispositionReturn => {
	const { wallets } = useWalletsList();
	const formatCurrency = useLocaleCurrency();

	const hasSavings = goal.progress.amount > 0;
	const savedAmount = formatCurrency(goal.progress.amount, goal.progress.currency);
	const walletOptions = useMemo(() => toWalletSelectOptions(wallets), [wallets]);

	const [mode, setMode] = useState<GoalDispositionMode>(hasSavings ? 'transfer' : 'spent');
	const [toWalletId, setToWalletId] = useState('');

	useEffect(() => {
		if (wallets.length === 0) return;

		setToWalletId((previous) => previous || wallets[0].id);
	}, [wallets]);

	const reset = useCallback(() => {
		setMode(hasSavings ? 'transfer' : 'spent');
	}, [hasSavings]);

	return {
		mode,
		hasSavings,
		savedAmount,
		walletOptions,
		selectedWallet: selectedWalletOption(walletOptions, toWalletId),
		disposition: { mode, toWalletId },
		transferReady: mode !== 'transfer' || !hasSavings || toWalletId !== '',
		selectMode: setMode,
		selectWallet: setToWalletId,
		reset,
	};
};

export { useGoalDisposition };
export type { UseGoalDispositionReturn };

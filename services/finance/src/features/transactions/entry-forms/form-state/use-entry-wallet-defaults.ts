import { useMemo } from "react";

import type { Wallet } from "@entity/wallets";


const useEntryWalletDefaults = (wallets: Wallet[]) => {
	return useMemo(() => {
		if (wallets.length === 0) return { fromWallet: '', toWallet: '' };

		const first = wallets[0];
		const second = wallets.find((wallet) => wallet.id !== first.id);

		return { fromWallet: first.id, toWallet: second?.id ?? '' };
	}, [wallets]);
}

export { useEntryWalletDefaults };

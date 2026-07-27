import { useMemo } from "react";

import type { Wallet, WalletSelectOption } from "@entity/wallets";


const useWalletSelectOptions = (wallets: Wallet[]): WalletSelectOption[] => {
	return useMemo(
		() => wallets.map((wallet) => ({
			id: wallet.id,
			name: wallet.name,
			currency: wallet.balance.currency,
			gradient: wallet.color,
		})),
		[wallets]
	);
};

export { useWalletSelectOptions };

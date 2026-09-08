import { walletGradient } from "../visual-map";
import type { Wallet } from "../types.ts";
import type { WalletSelectItem } from "../form-fields";


const toWalletSelectOptions = (wallets: Wallet[]): WalletSelectItem[] => {
	return wallets.map((wallet) => ({
		id: wallet.id,
		name: wallet.name,
		currency: wallet.balance.currency,
		gradient: walletGradient(wallet.color),
	}));
};

export { toWalletSelectOptions };

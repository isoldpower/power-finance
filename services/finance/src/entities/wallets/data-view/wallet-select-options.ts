import type { Wallet } from "../types.ts";
import type { WalletSelectOption } from "../form-fields";


const toWalletSelectOptions = (wallets: Wallet[]): WalletSelectOption[] => {
	return wallets.map((wallet) => ({
		id: wallet.id,
		name: wallet.name,
		currency: wallet.balance.currency,
		gradient: wallet.color,
	}));
};

export { toWalletSelectOptions };

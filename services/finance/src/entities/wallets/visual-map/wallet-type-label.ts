import type { Wallet } from "../types.ts";


const walletTypeLabel = (wallet: Wallet): string => {
	return wallet.category?.name ?? 'Wallet';
};

export { walletTypeLabel };

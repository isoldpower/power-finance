import type { Wallet } from "../types.ts";

const walletTypeLabel = (wallet: Wallet): string => {
	if (wallet.type === 'long-term-goal') return 'Savings';
	return wallet.credit ? 'Credit card' : 'Debit card';
}

export { walletTypeLabel };

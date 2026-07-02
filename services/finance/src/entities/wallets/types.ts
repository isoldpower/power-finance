type WalletType = 'wallet' | 'long-term-goal';

// Presentation metadata carried only by `long-term-goal` wallets so they can be
// rendered as goals while still being full wallets under the hood.
interface WalletGoalMeta {
	icon: string;
	color: string;
	target: string;
	monthly: string;
}

interface Wallet {
	id: string;
	name: string;
	balance: {
		amount: number;
		currency: string;
	}
	credit: boolean;
	// Optional for back-compat: a missing type is treated as a user-facing 'wallet'.
	type?: WalletType;
	goal?: WalletGoalMeta;
	createdAt?: string;
	updatedAt?: string;
}

export type { Wallet, WalletType, WalletGoalMeta };

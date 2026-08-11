type WalletType = 'wallet' | 'long-term-goal';

// Goal data carried only by `long-term-goal` wallets so they can be rendered as
// goals while still being full wallets under the hood.
interface WalletGoalMeta {
	icon: string;
	color: string;
	targetAmount: number;
	monthlyAmount: number;
}

interface Wallet {
	id: string;
	name: string;
	color: string;
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

// A `long-term-goal` wallet always carries its goal data, so goal consumers can
// rely on it without re-filling defaults the API already guarantees.
interface GoalWallet extends Wallet {
	type: 'long-term-goal';
	goal: WalletGoalMeta;
}

export type { Wallet, WalletType, WalletGoalMeta, GoalWallet };

interface WalletKind {
	id: string;
	label: string;
	credit: boolean;
}

export type { WalletKind };

type PanelMode = 'add' | 'scan' | 'wallet' | 'transfer' | 'edit';

interface PanelWallet {
	id: string;
	name: string;
	currency: string;
	credit: boolean;
	gradient: string;
	balance: {
		amount: number;
		currency: string;
	};
}

type GoalDispositionMode = 'transfer' | 'spent';

interface GoalDisposition {
	mode: GoalDispositionMode;
	toWalletId: string;
}

export type { PanelMode, PanelWallet, GoalDispositionMode, GoalDisposition };

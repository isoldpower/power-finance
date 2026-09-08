import type { Money } from "@entity/localization";


interface Wallet {
	id: string;
	name: string;
	createdAt: string;
	updatedAt: string | null;
	deletedAt: string | null;
	category: string;
	currency: string;
	balance: Money;
	zeroBalance: Money;
	favorite: boolean;
	color: string;
}

type WalletPeriod = 'last_week' | 'last_month' | 'last_year' | 'all_time';

interface WalletFlows {
	inflow: Money;
	outflow: Money;
}

interface WalletDetails extends Wallet {
	period: WalletFlows;
}

interface Goal {
	id: string;
	name: string;
	url: string | null;
	currency: string;
	finishAt: string | null;
	createdAt: string;
	updatedAt: string | null;
	deletedAt: string | null;
	target: Money;
	progress: Money;
}

interface WalletDraft {
	name: string;
	color: string;
	openingBalance: string;
	zeroBalance: string;
	currency: string;
	category: string;
}

interface WalletPatch {
	name?: string;
	favorite?: boolean;
	category?: string;
	zeroBalance?: string;
	color?: string;
}

interface GoalDraft {
	name: string;
	finishAt: string;
	currency: string;
	target: string;
}

interface GoalPatch {
	name?: string;
	finishAt?: string;
	target?: string;
}

interface WalletQuery {
	name?: string;
	currencies?: string[];
	minBalance?: number;
	maxBalance?: number;
	createdAfter?: string;
	createdBefore?: string;
}


interface PanelWallet {
	id: string;
	name: string;
	category: string;
	currency: string;
	gradient: string;
	balance: Money;
}

type GoalDispositionMode = 'transfer' | 'spent';

interface GoalDisposition {
	mode: GoalDispositionMode;
	toWalletId: string;
}

export type {
	Wallet,
	WalletDetails,
	WalletFlows,
	WalletPeriod,
	Goal,
	PanelWallet,
	GoalDispositionMode,
	GoalDisposition,
	WalletDraft,
	WalletPatch,
	GoalDraft,
	GoalPatch,
	WalletQuery
};

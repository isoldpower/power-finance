import type { WalletType, WalletGoalMeta } from "@entity/wallet";

interface WalletValuableFields {
	name: string
	balance: {
		amount: number
		currency: string
	}
	credit: boolean
	type?: WalletType
	goal?: WalletGoalMeta
}

interface WalletMeta {
	created_at: string
	updated_at: string
	id: string
}

interface WalletDetailed {
	id: string
	name: string
	balance: {
		amount: number
		currency: string
	}
	credit: boolean
	type?: WalletType
	goal?: WalletGoalMeta
	meta: WalletMeta
}

interface WalletPreview {
	id: string
	name: string
	balance: {
		amount: number
		currency: string
	}
	credit: boolean
	type?: WalletType
	goal?: WalletGoalMeta
}

type WalletMinimalPayload = WalletValuableFields;

interface Goal {
	id: string;
	icon: string;
	color: string;
	name: string;
	monthly: string;
	eta: string;
	saved: string;
	target: string;
	percent: number;
}

interface GoalCreatePayload {
	name: string;
	target: string;
	monthly: string;
	icon?: string;
	color?: string;
}

export type { WalletPreview, WalletDetailed, WalletMeta, WalletValuableFields, WalletMinimalPayload };
export type { Goal, GoalCreatePayload };
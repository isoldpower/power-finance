import type { WalletType, WalletGoalMeta } from "@entity/wallets";

interface WalletValuableFields {
	name: string
	color: string
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

interface WalletStats {
	transaction_count: number
	last_activity_at: string | null
}

interface WalletPreview {
	id: string
	name: string
	color: string
	balance: {
		amount: number
		currency: string
	}
	credit: boolean
	type?: WalletType
	goal?: WalletGoalMeta
}

interface WalletDetailed extends WalletPreview {
	meta: WalletMeta
	stats: WalletStats
}

type WalletMinimalPayload = WalletValuableFields;

interface WalletSearchLeaf {
	field_name: string;
	operator: string;
	value: string;
}

type WalletSearchNode = WalletSearchLeaf | WalletSearchRoot;

type WalletSearchRoot =
	| { AND: WalletSearchNode[]; OR?: never }
	| { OR: WalletSearchNode[]; AND?: never };

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

export type { WalletPreview, WalletDetailed, WalletMeta, WalletStats, WalletValuableFields, WalletMinimalPayload, WalletSearchRoot, WalletSearchNode, WalletSearchLeaf };
export type { Goal, GoalCreatePayload };
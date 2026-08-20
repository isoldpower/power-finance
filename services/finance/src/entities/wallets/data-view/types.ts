interface GoalView {
	id: string;
	icon: string;
	color: string;
	name: string;
	eta: string;
	saved: string;
	target: string;
	percent: number;
}

interface WalletCategoryOption {
	value: string;
	label: string;
}

export type { GoalView, WalletCategoryOption };

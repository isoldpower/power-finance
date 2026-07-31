type FormatMoney = (amount: number, currency: string) => string;

interface GoalView {
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

export type { FormatMoney, GoalView };

interface CashFlowPoint {
	start: string;
	end: string;
	inflow: number;
	outflow: number;
	net: number;
	balance: number;
	count: number;
}

interface CumulativePoint {
	start: string;
	inflow: number;
	outflow: number;
}

interface PacePoint {
	index: number;
	start: string;
	current: number | null;
	previous: number | null;
}

export type { CashFlowPoint, CumulativePoint, PacePoint };

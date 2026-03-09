type CategoriesAnalyticsResponse = CategoryAnalyticsPiece[];

interface CategoryAnalyticsPiece {
	category: string;
	amount: number;
}

interface MoneyFlowNode {
	id: string;
	name: string;
	level: number;
}

interface MoneyFlowLink {
	source: MoneyFlowNode;
	target: MoneyFlowNode;
	value: number;
}

interface MoneyFlowAnalyticsResponse {
	nodes: MoneyFlowNode[];
	links: MoneyFlowLink[];
}

interface ExpenditurePiece {
	income: number;
	expenses: number;
}

type ExpenditureAnalyticsResponse = Record<string, ExpenditurePiece>;

interface WalletBalanceHistoryPiece {
	date: string;
	balance: number;
}

type WalletBalanceHistoryResponse = WalletBalanceHistoryPiece[];

type SpendingHeatmapResponse = Record<string, number>;

export type {
	CategoryAnalyticsPiece, CategoriesAnalyticsResponse,
	MoneyFlowNode, MoneyFlowLink, MoneyFlowAnalyticsResponse,
	ExpenditurePiece, ExpenditureAnalyticsResponse,
	WalletBalanceHistoryPiece, WalletBalanceHistoryResponse,
	SpendingHeatmapResponse
}
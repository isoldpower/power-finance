import type { Money } from "@entity/shell";
import type { Granularity, WalletOption } from "@entity/filters";
import type { CategoryRef } from "@entity/spending";
import type { WalletRef } from "@entity/transactions";


interface CashFlowBucket {
	start: string;
	end: string;
	inflow: Money;
	outflow: Money;
	net: Money;
	transactionsCount: number;
	closingBalance: Money;
}

interface CashFlowTotals {
	inflow: Money;
	outflow: Money;
	net: Money;
}

interface CashFlow {
	buckets: CashFlowBucket[];
	totals: CashFlowTotals;
	granularity: Granularity;
}

type CashFlowMode = 'bars' | 'balance';

type SurplusMode = 'threshold' | 'lines';

interface WalletBalanceSeries {
	wallet: WalletOption;
	balances: Money[];
	nativeBalances: Money[];
}

interface BalanceHistory {
	timestamps: string[];
	total: Money[];
	wallets: WalletBalanceSeries[];
}

type FlowNodeKind = 'income_category' | 'wallet' | 'expense_category' | 'savings' | 'reserves';

interface FlowNode {
	id: string;
	kind: FlowNodeKind;
	label: string;
	category: CategoryRef | null;
	wallet: WalletRef | null;
	amount: Money;
}

interface FlowLink {
	source: string;
	target: string;
	amount: Money;
}

interface MoneyFlow {
	nodes: FlowNode[];
	links: FlowLink[];
	totalInflow: Money;
	totalOutflow: Money;
}

export type {
	BalanceHistory,
	CashFlow,
	CashFlowBucket,
	CashFlowMode,
	CashFlowTotals,
	FlowLink,
	FlowNode,
	FlowNodeKind,
	MoneyFlow,
	SurplusMode,
	WalletBalanceSeries,
};

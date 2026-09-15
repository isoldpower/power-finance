import type { Transaction, TransactionChainRef, TransactionType } from "../types.ts";


type ConvertMoney = (money: { amount: string; currency: string }) => {
	amount: string;
	currency: string;
	formatted: string;
	converted: boolean;
};

type ChainPosition = 'single' | 'start' | 'middle' | 'end';

interface Chainable {
	chain: TransactionChainRef | null;
}

interface ChainBoundOptions {
	continuesBefore?: boolean;
	continuesAfter?: boolean;
}

interface ChainBound<TItem extends Chainable> {
	item: TItem;
	chain: TransactionChainRef | null;
	position: ChainPosition;
	index: number;
	visible: number;
	truncated: boolean;
}

type ChainBoundTransaction = ChainBound<Transaction>;

interface LedgerEntryView {
	label: string;
	account: string;
	debit: boolean;
	amount: string;
}

interface TransactionRowView {
	id: string;
	amount: string;
	signedAmount: string;
	currency: string;
	type: TransactionType;
	walletId: string;
	walletName: string;
	chain: TransactionChainRef | null;
	createdAt: string;
	date: string;
	time: string;
	category: string;
	description: string;
	scanned: boolean;
	kind: string;
	provenance: string;
	pending: boolean;
}

interface TransactionMoneyView {
	walletName: string;
	amountOriginal: string;
	amountMain: string;
	amountAbsolute: string;
	converted: boolean;
	inTarget: boolean;
}

interface TransactionDayView {
	dayLabel: string;
	dayTotal: string;
	transactions: TransactionRowView[];
}

export type { Chainable, ChainBound, ChainBoundOptions, ChainBoundTransaction, ChainPosition, ConvertMoney, LedgerEntryView, TransactionDayView, TransactionMoneyView, TransactionRowView };

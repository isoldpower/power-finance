import type { TransactionType } from "../types.ts";


type ConvertMoney = (money: { amount: string; currency: string }) => {
	amount: string;
	currency: string;
	formatted: string;
	converted: boolean;
};

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
	createdAt: string;
	date: string;
	time: string;
	category: string;
	description: string;
	scanned: boolean;
	kind: string;
	provenance: string;
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

export type { ConvertMoney, LedgerEntryView, TransactionDayView, TransactionMoneyView, TransactionRowView };

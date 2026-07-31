import type { TransactionDirection, TransactionEntrySide } from "../types.ts";


type FormatMoney = (amount: number, currency: string) => string;

type ConvertMoney = (
	money: { amount: number; currency: string }
) => { amount: number; formatted: string; converted: boolean };

interface LedgerEntryView {
	label: string;
	account: string;
	side: TransactionEntrySide;
	amount: string;
}

interface TransactionRowView {
	id: string;
	amount: number;
	currency: string;
	direction: TransactionDirection;
	walletId: string;
	walletName: string;
	createdAt: string;
	date: string;
	time: string;
	category: string;
	kind: string;
	entries: LedgerEntryView[];
	provenance: string;
}

interface TransactionMoneyView {
	walletName: string;
	amountOriginal: string;
	amountMain: string;
	amountAbsolute: string;
	converted: boolean;
}

interface TransactionDayView {
	dayLabel: string;
	dayTotal: number;
	transactions: TransactionRowView[];
}

export type { ConvertMoney, FormatMoney, LedgerEntryView, TransactionDayView, TransactionMoneyView, TransactionRowView };

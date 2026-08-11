import type { AccountType, LedgerSide } from "../types.ts";


interface AccountView {
	id: string;
	name: string;
	kind: string;
	balanceUsd: number;
	accountType: AccountType;
}

interface AccountCategoryView {
	id: string;
	label: string;
	totalUsd: number;
	accounts: AccountView[];
}

interface AccountHistoryView {
	id: string;
	icon: string;
	description: string;
	date: string;
	side: LedgerSide;
	amountUsd: number;
}

interface AccountSegment {
	accountId: string;
	name: string;
	width: string;
	shade: number;
}

export type { AccountView, AccountCategoryView, AccountHistoryView, AccountSegment };

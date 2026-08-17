import type { AccountGroup } from "../types.ts";


interface AccountView {
	id: string;
	name: string;
	group: AccountGroup;
	balanceUsd: number;
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
	debit: boolean;
	amountUsd: number;
}

interface AccountSegment {
	accountId: string;
	name: string;
	width: string;
	shade: number;
}

export type { AccountView, AccountCategoryView, AccountHistoryView, AccountSegment };

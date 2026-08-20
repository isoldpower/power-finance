import type { Money } from "@entity/localization";
import type { AccountGroup } from "../types.ts";


interface AccountView {
	id: string;
	name: string;
	group: AccountGroup;
	balance: Money;
}

interface AccountCategoryView {
	id: string;
	label: string;
	accounts: AccountView[];
}

interface AccountHistoryView {
	id: string;
	icon: string;
	description: string;
	date: string;
	debit: boolean;
	amount: Money;
}

interface AccountSegment {
	accountId: string;
	name: string;
	width: string;
	shade: number;
}

export type { AccountView, AccountCategoryView, AccountHistoryView, AccountSegment };

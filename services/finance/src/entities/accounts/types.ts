import type { Money } from "@entity/localization";


type AccountGroup = 'assets' | 'liabilities' | 'equity';

type AccountGroupFilter = AccountGroup | 'all';

interface Account {
	id: string;
	group: AccountGroup;
	name: string;
	money: Money;
}

interface LedgerEntry {
	title: string;
	debit: boolean;
	createdAt: string;
	sourceTransaction: string;
	icon: string;
	money: Money;
}

interface AccountGroupCounts {
	assets: number;
	liabilities: number;
	equity: number;
}

export type { Account, AccountGroup, AccountGroupCounts, AccountGroupFilter, LedgerEntry };

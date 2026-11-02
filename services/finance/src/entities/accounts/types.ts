import type { Money } from "@entity/localization";


type AccountGroup = 'assets' | 'liabilities' | 'equity' | 'ungrouped';

type AccountGroupFilter = 'assets' | 'liabilities' | 'equity' | 'all';

interface Account {
	id: string;
	group: AccountGroup;
	name: string;
	money: Money;
	createdAt: string;
	updatedAt: string | null;
}

interface LedgerEntry {
	id: string;
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

interface GuestDemoSession {
	token: string;
	expiresAt: string;
	writeVersion: string | null;
}

export type { Account, AccountGroup, AccountGroupCounts, AccountGroupFilter, GuestDemoSession, LedgerEntry };

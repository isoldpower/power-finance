import type { CategoryRef } from "@entity/spending";


type PeriodPreset = '1M' | '3M' | '6M' | 'YTD' | '1Y' | 'custom';

type Granularity = 'day' | 'week' | 'month';

type LedgerSide = 'expense' | 'income';

interface DateRange {
	since: string;
	until: string;
}

interface WalletOption {
	id: string;
	name: string;
	color: string;
	currency: string;
}

interface CategoryCatalog {
	expense: CategoryRef[];
	income: CategoryRef[];
}

interface Dimensions {
	wallets: WalletOption[];
	categories: CategoryCatalog;
	firstTransactionAt: string | null;
	lastTransactionAt: string | null;
}

interface AnalyticsQuery {
	range: DateRange;
	currency: string;
	timezone: string;
	walletIds: string[];
}

interface CategoryDrill {
	kind: 'category';
	side: LedgerSide;
	category: CategoryRef | null;
}

interface DayDrill {
	kind: 'day';
	date: string;
}

interface BucketDrill {
	kind: 'bucket';
	range: DateRange;
	granularity: Granularity;
}

interface CounterpartyDrill {
	kind: 'counterparty';
	side: LedgerSide;
	name: string;
}

interface WalletDrill {
	kind: 'wallet';
	wallet: WalletOption;
}

type Drill = CategoryDrill | DayDrill | BucketDrill | CounterpartyDrill | WalletDrill;

export type {
	AnalyticsQuery,
	BucketDrill,
	CategoryCatalog,
	CategoryDrill,
	CounterpartyDrill,
	DateRange,
	DayDrill,
	Dimensions,
	Drill,
	Granularity,
	LedgerSide,
	PeriodPreset,
	WalletDrill,
	WalletOption,
};

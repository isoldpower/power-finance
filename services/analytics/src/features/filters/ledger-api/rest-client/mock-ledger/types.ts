import type { CategoryRefDto } from "../../types.ts";


type LedgerRowSide = 'income' | 'expense';

interface LedgerWallet {
	id: string;
	name: string;
	color: string;
	currency: string;
	openingBalance: number;
	favorite: boolean;
}

interface LedgerRow {
	id: string;
	name: string;
	createdAt: number;
	amount: number;
	currency: string;
	side: LedgerRowSide;
	category: CategoryRefDto | null;
	walletId: string;
	chainId: string | null;
}

interface LedgerSource {
	wallets: LedgerWallet[];
	rows: LedgerRow[];
	categories: CategoryRefDto[];
}

interface LedgerWindow {
	since: number;
	until: number;
}

interface LedgerQuery extends LedgerWindow {
	currency: string;
	timezone: string;
	walletIds: string[] | null;
	categories: (string | null)[] | null;
}

interface LedgerQueryParams {
	since?: string;
	until?: string;
	currency?: string;
	timezone?: string;
	wallet_id?: string[] | string;
	category?: string[] | string;
}

export type { LedgerQuery, LedgerQueryParams, LedgerRow, LedgerRowSide, LedgerSource, LedgerWallet, LedgerWindow };

import { LocalStorageMock, parseAmount } from "@internal/shared";
import { BUILT_IN_CATEGORIES, builtInByName, collectCategories, readFinanceCategories } from "./categories.ts";

import type { CategoryRefDto } from "../../types.ts";
import type { LedgerRow, LedgerSource, LedgerWallet } from "./types.ts";


const FINANCE_WALLETS_KEY = 'wallets-v1';
const FINANCE_TRANSACTIONS_KEY = 'transactions-v1';

interface FinanceStoredWallet {
	id: string;
	name: string;
	color: string;
	currency: string;
	opening_balance: string;
	favorite: boolean;
	deleted_at: string | null;
}

interface FinanceStoredTransaction {
	id: string;
	name: string;
	created_at: string;
	deleted_at: string | null;
	amount: string;
	currency: string;
	type: 'income' | 'expense';
	wallet_id: string;
	category_id?: string | null;
	category?: string | null;
	chain_id: string | null;
}

const toLedgerWallet = (wallet: FinanceStoredWallet): LedgerWallet => ({
	id: wallet.id,
	name: wallet.name,
	color: wallet.color,
	currency: wallet.currency,
	openingBalance: parseAmount(wallet.opening_balance),
	favorite: wallet.favorite,
});

const resolveCategory = (
	transaction: FinanceStoredTransaction,
	catalog: Map<string, CategoryRefDto>,
): CategoryRefDto | null => {
	if (transaction.category_id === undefined) {
		return builtInByName(transaction.category);
	}

	return transaction.category_id === null ? null : catalog.get(transaction.category_id) ?? null;
};

const toLedgerRow = (transaction: FinanceStoredTransaction, catalog: Map<string, CategoryRefDto>): LedgerRow => ({
	id: transaction.id,
	name: transaction.name,
	createdAt: new Date(transaction.created_at).getTime(),
	amount: parseAmount(transaction.amount),
	currency: transaction.currency,
	side: transaction.type,
	category: resolveCategory(transaction, catalog),
	walletId: transaction.wallet_id,
	chainId: transaction.chain_id,
});

const readFinanceSource = (): LedgerSource | null => {
	const wallets = new LocalStorageMock<FinanceStoredWallet>(FINANCE_WALLETS_KEY).list()
		.filter((wallet) => wallet.deleted_at === null)
		.map(toLedgerWallet);
	const walletIds = new Set(wallets.map((wallet) => wallet.id));
	const categories = [...BUILT_IN_CATEGORIES, ...readFinanceCategories()];
	const catalog = new Map(categories.map((category) => [category.id, category]));
	const rows = new LocalStorageMock<FinanceStoredTransaction>(FINANCE_TRANSACTIONS_KEY).list()
		.filter((transaction) => transaction.deleted_at === null && walletIds.has(transaction.wallet_id))
		.map((transaction) => toLedgerRow(transaction, catalog))
		.sort((left, right) => left.createdAt - right.createdAt);

	return rows.length === 0 ? null : { wallets, rows, categories: collectCategories(rows, categories) };
};

export { readFinanceSource };

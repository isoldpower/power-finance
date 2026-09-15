export const CACHE_KEYS = {
	list: 'transactions',
	search: 'transactionsSearch',
	ledger: 'transactionLedger',
	fetch: 'transaction',
	delete: 'deleteTransaction',
	replace: 'replaceTransaction',
	adjust: 'adjustTransaction',
	create: 'createTransaction',
	chain: 'createTransactionChain',
	categories: 'transactionCategories',
	scan: 'transactionReceiptScan',
} as const;

export const LEDGER_DISPATCH_POLL_MS = 2000;
export const MAX_DISPATCH_POLLS = 10;

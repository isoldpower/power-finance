export const CACHE_KEYS = {
	list: 'transactions',
	search: 'transactionsSearch',
	ledger: 'transactionLedger',
	fetch: 'transaction',
	delete: 'deleteTransaction',
	replace: 'replaceTransaction',
	create: 'createTransaction',
	chain: 'createTransactionChain',
	categories: 'transactionCategories',
	scan: 'transactionReceiptScan',
} as const;

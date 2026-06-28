// Anchor id for the Transactions section, so other widgets can scroll to it.
const TRANSACTIONS_SECTION_ID = 'management-transactions';

// Transactions table.
const TXN_PAGE_SIZE = 8;

const TXN_SORT_OPTIONS = [
	{ value: 'recent', label: 'Most recent' },
	{ value: 'amount', label: 'Amount: high → low' },
];

const TXN_TYPE_OPTIONS = [
	{ value: 'all', label: 'All types' },
	{ value: 'income', label: 'income' },
	{ value: 'expense', label: 'expense' },
];

// Wallets section: recent rows shown for the selected wallet (list height is padded to this).
const WALLET_RECENT_SLOTS = 3;

export { TRANSACTIONS_SECTION_ID, TXN_PAGE_SIZE, TXN_SORT_OPTIONS, TXN_TYPE_OPTIONS, WALLET_RECENT_SLOTS };

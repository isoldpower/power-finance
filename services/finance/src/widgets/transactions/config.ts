const TRANSACTIONS_SECTION_ID = 'management-transactions';

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

export { TRANSACTIONS_SECTION_ID, TXN_PAGE_SIZE, TXN_SORT_OPTIONS, TXN_TYPE_OPTIONS };

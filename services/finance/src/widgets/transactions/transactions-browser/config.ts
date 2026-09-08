const TRANSACTIONS_PAGE_SIZE = 10;

const TRANSACTION_TYPE_FILTER_OPTIONS = [
	{ value: 'all', label: 'All types' },
	{ value: 'in', label: 'Income' },
	{ value: 'out', label: 'Expense' },
];

const TRANSACTION_ORDER_LABEL = 'Newest first';

export { TRANSACTIONS_PAGE_SIZE, TRANSACTION_ORDER_LABEL, TRANSACTION_TYPE_FILTER_OPTIONS };

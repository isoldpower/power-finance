import type { OrderingType } from "@shared/data";


const TRANSACTIONS_PAGE_SIZE = 10;

const TRANSACTION_TYPE_FILTER_OPTIONS = [
	{ value: 'all', label: 'All types' },
	{ value: 'in', label: 'Income' },
	{ value: 'out', label: 'Expense' },
];

const TRANSACTION_SORT_OPTIONS = [
	{ value: 'created_at:DESC', label: 'Newest first' },
	{ value: 'amount:DESC', label: 'Amount: high → low' },
	{ value: 'amount:ASC', label: 'Amount: low → high' },
];

const toSortKey = (field: string, direction: OrderingType): string => `${field}:${direction}`;

const fromSortKey = (key: string): { field: string; direction: OrderingType } => {
	const [field, direction] = key.split(':');

	return { field, direction: direction === 'ASC' ? 'ASC' : 'DESC' };
};

export { TRANSACTIONS_PAGE_SIZE, TRANSACTION_TYPE_FILTER_OPTIONS, TRANSACTION_SORT_OPTIONS };
export { toSortKey, fromSortKey };

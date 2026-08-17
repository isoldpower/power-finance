import type { OrderingType } from "@shared/data";


const WALLETS_PAGE_SIZE = 5;

const WALLET_SORT_OPTIONS = [
	{ value: 'balance:DESC', label: 'Balance: high → low' },
	{ value: 'balance:ASC', label: 'Balance: low → high' },
	{ value: 'name:ASC', label: 'Name A–Z' },
	{ value: 'updatedAt:DESC', label: 'Recently updated' },
];

const toSortKey = (field: string, direction: OrderingType): string => `${field}:${direction}`;

const fromSortKey = (key: string): { field: string; direction: OrderingType } => {
	const [field, direction] = key.split(':');

	return { field, direction: direction === 'ASC' ? 'ASC' : 'DESC' };
};

export { WALLETS_PAGE_SIZE, WALLET_SORT_OPTIONS };
export { toSortKey, fromSortKey };

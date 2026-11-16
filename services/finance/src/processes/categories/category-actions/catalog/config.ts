import type { CategoryKind } from "@entity/categories";


interface CategoryCatalogCopy {
	heading: string;
	description: string;
	empty: string;
}

const CATEGORY_CATALOG_COPY: Record<CategoryKind, CategoryCatalogCopy> = {
	transaction: {
		heading: 'Transaction categories',
		description: 'Used to group spending and income in the ledger, filters and automations.',
		empty: 'No categories of your own yet. Add one to go beyond the built-in set.',
	},
	wallet: {
		heading: 'Wallet categories',
		description: 'Used to label wallets in the browser and on wallet cards.',
		empty: 'No categories of your own yet. Add one to go beyond the built-in set.',
	},
};

export { CATEGORY_CATALOG_COPY };

import type { Wallet } from "../types.ts";
import type { WalletCategoryOption } from "./types.ts";


const ALL_CATEGORIES: WalletCategoryOption = { 
	value: 'all',
	label: 'All categories'
};

const toWalletCategoryOptions = (wallets: Wallet[]): WalletCategoryOption[] => {
	const categories = [
		...new Set(
			wallets
				.map((wallet) => wallet.category)
				.filter((category) => category !== '')
		)
	];

	return [
		ALL_CATEGORIES, 
		...categories
			.sort()
			.map((category) => ({ 
				value: category, 
				label: category
			}))
	];
};

export { toWalletCategoryOptions };

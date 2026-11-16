import type { CategoryRef } from "@entity/categories";
import type { Wallet } from "../types.ts";
import type { WalletCategoryOption } from "./types.ts";


const ALL_CATEGORIES: WalletCategoryOption = { 
	value: 'all',
	label: 'All categories'
};

const toWalletCategoryOptions = (wallets: Wallet[]): WalletCategoryOption[] => {
	const categories = new Map<string, CategoryRef>();

	for (const wallet of wallets) {
		if (wallet.category) {
			categories.set(wallet.category.id, wallet.category);
		}
	}

	return [
		ALL_CATEGORIES, 
		...[...categories.values()]
			.sort((left, right) => left.name.localeCompare(right.name))
			.map((category) => ({ 
				value: category.id, 
				label: category.name
			}))
	];
};

export { toWalletCategoryOptions };

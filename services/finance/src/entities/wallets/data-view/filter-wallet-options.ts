import type { WalletSelectItem } from "../form-fields";


const matchesQuery = (option: WalletSelectItem, query: string): boolean => {
	return option.name.toLowerCase().includes(query)
		|| option.currency.toLowerCase().includes(query);
};

const filterWalletOptions = (
	options: WalletSelectItem[],
	query: string,
): WalletSelectItem[] => {
	const normalized = query.trim().toLowerCase();

	return normalized === ''
		? options
		: options.filter((option) => matchesQuery(option, normalized));
};

export { filterWalletOptions };

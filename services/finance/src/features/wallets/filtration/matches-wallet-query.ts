import { compareAmounts, toAmountString } from "@shared/api";

import type { Wallet, WalletQuery } from "@entity/wallets";


const matchesName = (
	wallet: Wallet,
	needle: string | undefined,
): boolean => {
	if (!needle) return true;

	return wallet.name.toLowerCase().includes(needle.toLowerCase());
};

const matchesCurrency = (
	wallet: Wallet,
	currencies: string[] | undefined,
): boolean => {
	if (!currencies?.length) return true;

	return currencies.includes(wallet.currency);
};

const matchesBalance = (
	wallet: Wallet,
	minimum: number | undefined,
	maximum: number | undefined,
): boolean => {
	const aboveFloor = minimum === undefined
		|| compareAmounts(wallet.balance.amount, toAmountString(minimum)) >= 0;
	const belowCeiling = maximum === undefined
		|| compareAmounts(wallet.balance.amount, toAmountString(maximum)) <= 0;

	return aboveFloor && belowCeiling;
};

const matchesCreation = (
	wallet: Wallet,
	after: string | undefined,
	before: string | undefined,
): boolean => {
	const since = !after || wallet.createdAt >= after;
	const until = !before || wallet.createdAt <= before;

	return since && until;
};

const matchesWalletQuery = (
	wallet: Wallet,
	query: WalletQuery,
): boolean => (
	matchesName(wallet, query.name) &&
	matchesCurrency(wallet, query.currencies) &&
	matchesBalance(wallet, query.minBalance, query.maxBalance) &&
	matchesCreation(wallet, query.createdAfter, query.createdBefore)
);

export { matchesWalletQuery };

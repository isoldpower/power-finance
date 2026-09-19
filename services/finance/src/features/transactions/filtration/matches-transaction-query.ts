import { compareAmounts, toAmountString } from "@shared/api";

import type { Transaction, TransactionQuery, TransactionType } from "@entity/transactions";


const containsNeedle = (
	haystack: string | null,
	needle: string,
	caseSensitive: boolean,
): boolean => {
	if (haystack === null) return false;
	if (caseSensitive) return haystack.includes(needle);

	return haystack.toLowerCase().includes(needle.toLowerCase());
};

const matchesMembership = (
	value: string | null,
	allowed: string[] | undefined,
): boolean => {
	if (!allowed?.length) return true;
	if (value === null) return false;

	return allowed.includes(value);
};

const matchesChain = (
	transaction: Transaction,
	chainId: string | undefined,
): boolean => {
	if (!chainId) return true;

	return transaction.chain?.id === chainId;
};

const matchesTypes = (
	transaction: Transaction,
	types: TransactionType[] | undefined,
): boolean => {
	if (!types?.length) return true;

	return types.includes(transaction.type);
};

const matchesText = (
	transaction: Transaction,
	query: TransactionQuery,
): boolean => {
	if (!query.search) return true;

	const caseSensitive = query.caseSensitive ?? false;

	return containsNeedle(transaction.name, query.search, caseSensitive)
		|| containsNeedle(transaction.category, query.search, caseSensitive);
};

const matchesAmount = (
	transaction: Transaction,
	minimum: number | undefined,
	maximum: number | undefined,
): boolean => {
	const aboveFloor = minimum === undefined
		|| compareAmounts(transaction.money.amount, toAmountString(minimum)) >= 0;
	const belowCeiling = maximum === undefined
		|| compareAmounts(transaction.money.amount, toAmountString(maximum)) <= 0;

	return aboveFloor && belowCeiling;
};

const matchesCreation = (
	transaction: Transaction,
	after: string | undefined,
	before: string | undefined,
): boolean => {
	const since = !after || transaction.createdAt >= after;
	const until = !before || transaction.createdAt <= before;

	return since && until;
};

const matchesTransactionQuery = (
	transaction: Transaction,
	query: TransactionQuery,
): boolean => (
	matchesMembership(transaction.wallet.id, query.walletIds) &&
	matchesChain(transaction, query.chainId) &&
	matchesMembership(transaction.money.currency, query.currencies) &&
	matchesMembership(transaction.category, query.categories) &&
	matchesTypes(transaction, query.types) &&
	matchesText(transaction, query) &&
	matchesAmount(transaction, query.minAmount, query.maxAmount) &&
	matchesCreation(transaction, query.createdAfter, query.createdBefore)
);

export { matchesTransactionQuery };

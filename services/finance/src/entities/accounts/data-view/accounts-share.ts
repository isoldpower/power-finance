import { parseAmount } from "@shared/api";

import { SHADE_FADE_LIMIT, SHADE_STEP } from "./config.ts";

import type { AccountCategoryView, AccountSegment, AccountView } from "./types.ts";


const categoryMagnitude = (accounts: AccountView[]): number => {
	return accounts.reduce((sum, account) => sum + Math.abs(parseAmount(account.balance.amount)), 0);
};

const toSegmentsScale = (categories: AccountCategoryView[]): number => {
	const totals = categories.map((category) => categoryMagnitude(category.accounts));

	return Math.max(...totals, 0) || 1;
};

const toAccountSegments = (accounts: AccountView[], scale: number): AccountSegment[] => {
	return accounts.map((account, index) => ({
		accountId: account.id,
		name: account.name,
		width: `${((Math.abs(parseAmount(account.balance.amount)) / scale) * 100).toFixed(1)}%`,
		shade: Math.round((1 - Math.min(index * SHADE_STEP, SHADE_FADE_LIMIT)) * 100),
	}));
};

export { toAccountSegments, toSegmentsScale };

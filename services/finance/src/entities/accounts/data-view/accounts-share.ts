import { SHADE_MAX, SHADE_MIN } from "./config.ts";

import type { AccountSegment, AccountView } from "./types.ts";


const toAccountSegments = (accounts: AccountView[]): AccountSegment[] => {
	const total = accounts.reduce((sum, account) => sum + Math.abs(account.balanceUsd), 0) || 1;
	const span = SHADE_MAX - SHADE_MIN;

	return accounts.map((account, index) => ({
		accountId: account.id,
		name: account.name,
		width: `${((Math.abs(account.balanceUsd) / total) * 100).toFixed(1)}%`,
		shade: accounts.length === 1 ? SHADE_MAX : Math.round(SHADE_MAX - (index * span) / (accounts.length - 1)),
	}));
};

export { toAccountSegments };

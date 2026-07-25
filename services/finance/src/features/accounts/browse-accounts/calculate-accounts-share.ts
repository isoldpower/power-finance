import type { MockAccount } from "../types.ts";
import type { AccountSegment } from "./types.ts";


const SHADE_MIN = 42;

const calculateAccountsShare = (accounts: MockAccount[]): AccountSegment[] => {
	const total = accounts.reduce((sum, account) => sum + Math.abs(account.balanceUsd), 0) || 1;

	return accounts.map((account, index) => ({
		accountId: account.id,
		name: account.name,
		width: `${((Math.abs(account.balanceUsd) / total) * 100).toFixed(1)}%`,
		shade: accounts.length === 1 ? 100 : Math.round(100 - (index * (100 - SHADE_MIN)) / (accounts.length - 1)),
	}));
};

export { calculateAccountsShare };
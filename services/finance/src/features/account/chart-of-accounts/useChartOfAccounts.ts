import { useState } from "react";

import { useConvertMoney } from "@feature/fx";

import { MOCK_ACCOUNT_CATEGORIES, MOCK_ACCOUNT_HISTORY } from "../model.ts";
import type { MockAccount } from "../model.ts";

const SHADE_MIN = 42;

interface AccountSegment {
	accountId: string;
	name: string;
	width: string;
	shade: number;
}

// Segments are derived from accounts so each maps 1:1 to one, sized by share of the category
// total and tinted as a shade of the category color.
const segmentsFor = (accounts: MockAccount[]): AccountSegment[] => {
	const total = accounts.reduce((sum, account) => sum + Math.abs(account.balanceUsd), 0) || 1;
	return accounts.map((account, index) => ({
		accountId: account.id,
		name: account.name,
		width: `${((Math.abs(account.balanceUsd) / total) * 100).toFixed(1)}%`,
		shade: accounts.length === 1 ? 100 : Math.round(100 - (index * (100 - SHADE_MIN)) / (accounts.length - 1)),
	}));
};

const useChartOfAccounts = () => {
	const { convert } = useConvertMoney();
	// Accounts are stored in USD; display them in the user's selected main currency.
	const money = (usd: number) => convert({ amount: usd, currency: 'USD' }).formatted;
	const signedMoney = (usd: number) => `${usd >= 0 ? '+' : '−'}${convert({ amount: Math.abs(usd), currency: 'USD' }).formatted}`;

	const [categoryId, setCategoryId] = useState(MOCK_ACCOUNT_CATEGORIES[0].id);
	const category = MOCK_ACCOUNT_CATEGORIES.find((entry) => entry.id === categoryId) ?? MOCK_ACCOUNT_CATEGORIES[0];
	const [accountId, setAccountId] = useState(category.accounts[0].id);
	const account = category.accounts.find((entry) => entry.id === accountId) ?? category.accounts[0];

	const selectCategory = (id: string) => {
		setCategoryId(id);
		const next = MOCK_ACCOUNT_CATEGORIES.find((entry) => entry.id === id);
		if (next) setAccountId(next.accounts[0].id);
	};

	const selectSegment = (catId: string, accId: string) => {
		setCategoryId(catId);
		setAccountId(accId);
	};

	const accountCount = MOCK_ACCOUNT_CATEGORIES.reduce((sum, entry) => sum + entry.accounts.length, 0);

	return {
		categories: MOCK_ACCOUNT_CATEGORIES,
		history: MOCK_ACCOUNT_HISTORY,
		categoryId,
		accountId,
		category,
		account,
		accountCount,
		selectCategory,
		selectSegment,
		setAccountId,
		money,
		signedMoney,
		segmentsFor,
	};
};

export { useChartOfAccounts };
export type { AccountSegment };

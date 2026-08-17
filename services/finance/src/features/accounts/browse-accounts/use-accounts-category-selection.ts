import { useCallback, useMemo, useState } from "react";

import { useAccountsList } from "../data-presenters";
import { toAccountCategoryViews } from "@entity/accounts";

import type { BrowseAccountsContextType } from "./types.ts";
import type { AccountView, AccountCategoryView } from "@entity/accounts";


const EMPTY_ACCOUNT: AccountView = { id: '', name: '', group: 'assets', balanceUsd: 0 };
const EMPTY_CATEGORY: AccountCategoryView = { id: '', label: '', totalUsd: 0, accounts: [] };

const useAccountsCategorySelection = (): BrowseAccountsContextType => {
	const { accounts } = useAccountsList();
	const categories = useMemo(() => toAccountCategoryViews(accounts), [accounts]);

	const [categoryId, setCategoryId] = useState('');
	const [accountId, setAccountId] = useState('');

	const category = useMemo(() => {
		return categories.find((entry) => entry.id === categoryId) ?? categories[0] ?? EMPTY_CATEGORY;
	}, [categories, categoryId]);
	const account = useMemo(() => {
		return category.accounts.find((entry) => entry.id === accountId) ?? category.accounts[0] ?? EMPTY_ACCOUNT;
	}, [category, accountId]);
	const accountCount = useMemo(() => {
		return categories.reduce((sum, entry) => sum + entry.accounts.length, 0);
	}, [categories]);

	const selectCategory = useCallback((id: string) => {
		setCategoryId(id);

		const nextCategory = categories.find((entry) => entry.id === id);
		if (nextCategory?.accounts[0]) {
			setAccountId(nextCategory.accounts[0].id);
		}
	}, [categories]);
	const selectSegment = useCallback((nextCategoryId: string, nextAccountId: string) => {
		setCategoryId(nextCategoryId);
		setAccountId(nextAccountId);
	}, []);

	return {
		categories,
		categoryId: category.id,
		accountId: account.id,
		category,
		account,
		accountCount,
		selectCategory,
		selectSegment,
		setAccountId,
	} satisfies BrowseAccountsContextType;
};

export { useAccountsCategorySelection };

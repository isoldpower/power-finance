import { useCallback, useMemo, useState } from "react";

import { useAccountsList } from "../data-presenters";
import { groupAccountsIntoCategories } from "./account-view.ts";
import { BrowseAccountsContextType } from "@feature/accounts/browse-accounts/types.ts";
import type { MockAccount, MockAccountCategory } from "@feature/accounts";


const EMPTY_ACCOUNT: MockAccount = { id: '', name: '', kind: '', balanceUsd: 0, balanceTone: 'neutral', accountType: '' };
const EMPTY_CATEGORY: MockAccountCategory = { id: '', label: '', totalUsd: 0, accounts: [] };

const useAccountsCategorySelection = (): BrowseAccountsContextType => {
	const { accounts } = useAccountsList();
	const categories = useMemo(() => groupAccountsIntoCategories(accounts), [accounts]);

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

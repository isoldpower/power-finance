import { useCallback, useMemo, useState } from "react";

import { useAccountsList } from "../data-presenters";
import { toAccountCategoryViews } from "@entity/accounts";

import type { BrowseAccountsContextType } from "./types.ts";


const useAccountsCategorySelection = (): BrowseAccountsContextType => {
	const [categoryId, setCategoryId] = useState('');
	const [accountId, setAccountId] = useState('');
	
	const { accounts } = useAccountsList();
	const categories = useMemo(() => {
		return toAccountCategoryViews(accounts);
	}, [accounts]);
	const category = useMemo(() => {
		return categories.find((entry) => {
			return entry.id === categoryId
		}) ?? categories[0];
	}, [categories, categoryId]);
	const account = useMemo(() => {
		return category.accounts.find((entry) => {
			return entry.id === accountId
		}) ?? category.accounts[0];
	}, [category, accountId]);
	const accountCount = useMemo(() => {
		return categories.reduce((sum, entry) => {
			return sum + entry.accounts.length;
		}, 0);
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

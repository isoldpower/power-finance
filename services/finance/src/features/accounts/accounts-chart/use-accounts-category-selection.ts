import { useCallback, useMemo, useState } from "react";

import { MOCK_ACCOUNT_CATEGORIES } from "../mock.ts";


const useAccountsCategorySelection = () => {
	const [categoryId, setCategoryId] = useState(MOCK_ACCOUNT_CATEGORIES[0].id);
	const [accountId, setAccountId] = useState(MOCK_ACCOUNT_CATEGORIES[0].id);

	const category = useMemo(() => {
		return MOCK_ACCOUNT_CATEGORIES.find((entry) => {
			return entry.id === categoryId;
		}) ?? MOCK_ACCOUNT_CATEGORIES[0];
	}, [categoryId]);
	const account = useMemo(() => {
		return category.accounts.find((entry) => {
			return entry.id === accountId;
		}) ?? category.accounts[0];
	}, [accountId, category.accounts]);
	const accountCount = useMemo(() => {
		return MOCK_ACCOUNT_CATEGORIES.reduce((sum, entry) => {
			return sum + entry.accounts.length
		}, 0);
	}, []);

	const selectCategory = useCallback((id: string) => {
		setCategoryId(id);
		
		const nextCategory = MOCK_ACCOUNT_CATEGORIES
			.find((entry) => entry.id === id);
		if (nextCategory) {
			setAccountId(nextCategory.accounts[0].id);
		}
	}, []);
	const selectSegment = useCallback((categoryId: string, accountId: string) => {
		setCategoryId(categoryId);
		setAccountId(accountId);
	}, []);
	
	return {
		categories: MOCK_ACCOUNT_CATEGORIES,
		categoryId,
		accountId,
		category,
		account,
		accountCount,
		selectCategory,
		selectSegment,
		setAccountId,
	};
};

export { useAccountsCategorySelection };

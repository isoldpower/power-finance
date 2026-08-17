import { CATEGORY_ID, CATEGORY_ORDER } from "./config.ts";
import { CATEGORY_LABEL } from "../visual-map";

import type { Account } from "../types.ts";
import type { AccountCategoryView, AccountView } from "./types.ts";


const toAccountView = (account: Account): AccountView => ({
	id: account.id,
	name: account.name,
	group: account.group,
	balanceUsd: account.money.amount,
});

const toAccountCategoryViews = (accounts: Account[]): AccountCategoryView[] => {
	return CATEGORY_ORDER
		.map((group) => {
			const owned = accounts.filter((account) => account.group === group);

			return {
				id: CATEGORY_ID[group],
				label: CATEGORY_LABEL[group],
				totalUsd: owned.reduce((sum, account) => sum + account.money.amount, 0),
				accounts: owned.map(toAccountView),
			};
		})
		.filter((category) => category.accounts.length > 0);
};

export { toAccountCategoryViews };

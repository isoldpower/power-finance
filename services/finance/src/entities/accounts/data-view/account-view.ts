import { CATEGORY_ID, CATEGORY_LABEL, CATEGORY_ORDER } from "./config.ts";

import type { Account } from "../types.ts";
import type { AccountCategoryView, AccountView } from "./types.ts";


const toAccountView = (account: Account): AccountView => ({
	id: account.id,
	name: account.name,
	kind: account.kind,
	balanceUsd: account.balance.amount,
	accountType: account.type,
});

const toAccountCategoryViews = (accounts: Account[]): AccountCategoryView[] => {
	return CATEGORY_ORDER
		.map((type) => {
			const owned = accounts.filter((account) => account.type === type);

			return {
				id: CATEGORY_ID[type],
				label: CATEGORY_LABEL[type],
				totalUsd: owned.reduce((sum, account) => sum + account.balance.amount, 0),
				accounts: owned.map(toAccountView),
			};
		})
		.filter((category) => category.accounts.length > 0);
};

export { toAccountCategoryViews };

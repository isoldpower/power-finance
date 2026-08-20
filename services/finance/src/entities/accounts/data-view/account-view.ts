import { CATEGORY_ID, CATEGORY_ORDER } from "./config.ts";
import { CATEGORY_LABEL } from "../visual-map";

import type { Account } from "../types.ts";
import type { AccountCategoryView, AccountView } from "./types.ts";


const toAccountView = (account: Account): AccountView => ({
	id: account.id,
	name: account.name,
	group: account.group,
	balance: account.money,
});

const toAccountCategoryViews = (accounts: Account[]): AccountCategoryView[] => {
	return CATEGORY_ORDER
		.map((group) => {
			const owned = accounts.filter((account) => account.group === group);

			return {
				id: CATEGORY_ID[group],
				label: CATEGORY_LABEL[group],
				accounts: owned.map(toAccountView),
			};
		})
		.filter((category) => category.accounts.length > 0);
};

export { toAccountCategoryViews };

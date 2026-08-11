import type { AccountCategoryView, AccountView } from "@entity/accounts";


interface BrowseAccountsContextType {
	categories: AccountCategoryView[]
	categoryId: string
	accountId: string
	category: AccountCategoryView
	account: AccountView
	accountCount: number
	selectCategory: (category: string) => void
	selectSegment: (categoryId: string, accountId: string) => void
	setAccountId: (accountId: string) => void
}

export type { BrowseAccountsContextType };

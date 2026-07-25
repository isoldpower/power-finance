import type {MockAccount, MockAccountCategory} from "@feature/accounts";


interface AccountSegment {
	accountId: string;
	name: string;
	width: string;
	shade: number;
}

interface BrowseAccountsContextType {
	categories: MockAccountCategory[]
	categoryId: string
	accountId: string
	category: MockAccountCategory
	account: MockAccount
	accountCount: number
	selectCategory: (category: string) => void
	selectSegment: (categoryId: string, accountId: string) => void
	setAccountId: (accountId: string) => void
}

export type { AccountSegment, BrowseAccountsContextType };
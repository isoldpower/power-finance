import { accountAmountTone, ledgerIconClass, ledgerSideTone } from "@entity/accounts";
import type { Account, AccountType, LedgerEntryDto } from "@entity/accounts";
import type { MockAccount, MockAccountCategory, AccountHistoryEntry } from "@feature/accounts";


const CATEGORY_ID: Record<AccountType, string> = {
	asset: 'assets',
	liability: 'liabilities',
	equity: 'equity',
};

const CATEGORY_LABEL: Record<AccountType, string> = {
	asset: 'Assets',
	liability: 'Liabilities',
	equity: 'Equity',
};

const CATEGORY_ORDER: AccountType[] = ['asset', 'liability', 'equity'];

const accountToView = (account: Account): MockAccount => {
	return {
		id: account.id,
		name: account.name,
		kind: account.kind,
		balanceUsd: account.balance.amount,
		balanceTone: accountAmountTone(account.balance.amount),
		accountType: account.type,
	};
};

const groupAccountsIntoCategories = (accounts: Account[]): MockAccountCategory[] => {
	return CATEGORY_ORDER
		.map((type) => {
			const owned = accounts.filter((account) => account.type === type);

			return {
				id: CATEGORY_ID[type],
				label: CATEGORY_LABEL[type],
				totalUsd: owned.reduce((sum, account) => sum + account.balance.amount, 0),
				accounts: owned.map(accountToView),
			};
		})
		.filter((category) => category.accounts.length > 0);
};

const ledgerEntryToHistory = (entry: LedgerEntryDto): AccountHistoryEntry => {
	const value = entry.amount.amount;

	return {
		id: entry.id,
		icon: entry.icon,
		iconClass: ledgerIconClass(value),
		description: entry.description,
		date: new Date(entry.occurredAt).toLocaleDateString('en-US', { 
			month: 'short',
			day: 'numeric',
		}),
		side: entry.side,
		sideTone: ledgerSideTone(entry.side),
		amountUsd: value,
		amountTone: accountAmountTone(value),
	};
};

export { groupAccountsIntoCategories, ledgerEntryToHistory };

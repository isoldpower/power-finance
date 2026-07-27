type AccountType = 'asset' | 'liability' | 'equity';

type LedgerSide = 'DR' | 'CR';

interface AccountMoney {
	amount: number;
	currency: string;
}

interface Account {
	id: string;
	name: string;
	kind: string;
	type: AccountType;
	balance: AccountMoney;
	createdAt?: string;
	updatedAt?: string;
}

interface LedgerEntryDto {
	id: string;
	occurredAt: string;
	description: string;
	icon: string;
	side: LedgerSide;
	amount: AccountMoney;
}

export type { AccountType, LedgerSide, AccountMoney, Account, LedgerEntryDto };

import type { AccountType, LedgerSide } from "@entity/accounts";


interface AccountMoney {
	amount: number
	currency: string
}

interface AccountMeta {
	id: string
	created_at: string
	updated_at: string
}

interface AccountTotals {
	balance: AccountMoney
}

interface AccountPreview {
	id: string
	name: string
	kind: string
	type: AccountType
	balance: AccountMoney
}

interface AccountDetailed extends AccountPreview {
	meta: AccountMeta
	totals: AccountTotals
}

interface LedgerEntry {
	id: string
	occurred_at: string
	description: string
	icon: string
	side: LedgerSide
	amount: AccountMoney
}

export type { AccountMoney, AccountMeta, AccountTotals, AccountPreview, AccountDetailed, LedgerEntry };

import { parseAmount } from "@shared/api";
import type { MoneyDto } from "@shared/api";
import type { Money } from "@entity/localization";
import type { Account, AccountGroupCounts, LedgerEntry } from "@entity/accounts";
import type { AccountDto, AccountGroupCountsDto, LedgerEntryDto } from "../types.ts";

const moneyFromApi = (dto: MoneyDto): Money => ({
	amount: parseAmount(dto.amount),
	currency: dto.currency,
});

const accountFromApi = (dto: AccountDto): Account => ({
	id: dto.id,
	group: dto.group,
	name: dto.name,
	money: moneyFromApi(dto.money),
});

const ledgerEntryFromApi = (dto: LedgerEntryDto): LedgerEntry => ({
	title: dto.title,
	debit: dto.debit,
	createdAt: dto.created_at,
	sourceTransaction: dto.source_transaction,
	icon: dto.icon,
	money: moneyFromApi(dto.money),
});

const groupCountsFromApi = (dto: AccountGroupCountsDto): AccountGroupCounts => ({
	assets: dto.assets,
	liabilities: dto.liabilities,
	equity: dto.equity,
});

export { accountFromApi, groupCountsFromApi, ledgerEntryFromApi, moneyFromApi };

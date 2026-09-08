import { moneyFromApi } from "@feature/localization/currencies-api";

import type { Account, AccountGroup, AccountGroupCounts, LedgerEntry } from "@entity/accounts";
import type { AccountDto, AccountGroupCountsDto, LedgerEntryDto } from "../types.ts";


const UNGROUPED: AccountGroup = 'ungrouped';

const accountFromApi = (dto: AccountDto): Account => ({
	id: dto.id,
	group: dto.group === '' ? UNGROUPED : dto.group,
	name: dto.name,
	money: moneyFromApi(dto.money),
	createdAt: dto.created_at,
	updatedAt: dto.updated_at,
});

const ledgerEntryFromApi = (dto: LedgerEntryDto): LedgerEntry => ({
	id: dto.id,
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

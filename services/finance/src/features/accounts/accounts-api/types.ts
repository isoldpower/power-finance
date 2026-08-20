import type { MoneyDto, PageParams } from "@shared/api";

type AccountGroupDto = 'assets' | 'liabilities' | 'equity';

type AccountGroupFilterDto = AccountGroupDto | 'all';

interface AccountDto {
	id: string;
	group: AccountGroupDto;
	name: string;
	money: MoneyDto;
}

interface LedgerEntryDto {
	title: string;
	debit: boolean;
	created_at: string;
	source_transaction: string;
	icon: string;
	money: MoneyDto;
}

interface AccountDetailDto extends AccountDto {
	history: LedgerEntryDto[];
}

interface AccountListParams extends PageParams {
	group?: AccountGroupFilterDto;
	lowbar?: string;
	currency?: string;
}

interface AccountGroupCountsDto {
	assets: number;
	liabilities: number;
	equity: number;
}

interface AccountListMeta {
	lowbar: string;
	currency: string;
	group: AccountGroupFilterDto;
	groups: AccountGroupCountsDto;
}

export type {
	AccountDto,
	AccountDetailDto,
	AccountGroupDto,
	AccountGroupFilterDto,
	AccountGroupCountsDto,
	AccountListMeta,
	AccountListParams,
	LedgerEntryDto,
};

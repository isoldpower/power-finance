import type { MoneyDto } from "@internal/shared";


type LedgerSideDto = 'expense' | 'income';

type GranularityDto = 'day' | 'week' | 'month';

interface WalletRefDto {
	id: string;
	name: string;
	color: string;
}

interface WalletOptionDto extends WalletRefDto {
	currency: string;
}

interface CategoryRefDto {
	id: string;
	name: string;
	is_global: boolean;
}

interface CategoryCatalogDto {
	expense: CategoryRefDto[];
	income: CategoryRefDto[];
}

interface DimensionsDto {
	wallets: WalletOptionDto[];
	categories: CategoryCatalogDto;
	first_transaction_at: string | null;
	last_transaction_at: string | null;
}

interface TransactionBriefDto {
	id: string;
	name: string;
	created_at: string;
	type: LedgerSideDto;
	category: CategoryRefDto | null;
	wallet: WalletRefDto;
	money: MoneyDto;
	converted: MoneyDto;
}

interface AnalyticsParamsDto {
	since: string;
	until: string;
	currency: string;
	timezone: string;
	wallet_id?: string[];
}

interface AnalyticsMetaDto {
	since: string;
	until: string;
	currency: string;
	timezone: string;
	wallet_ids: string[] | null;
	categories: string[] | null;
	generated_at: string;
	cached?: boolean;
}

interface DimensionsMetaDto {
	currency: string;
	generated_at: string;
}

const UNCATEGORIZED_TOKEN = '__none__';
const OTHER_TOKEN = '__other__';

export { OTHER_TOKEN, UNCATEGORIZED_TOKEN };
export type {
	AnalyticsMetaDto,
	AnalyticsParamsDto,
	CategoryCatalogDto,
	CategoryRefDto,
	DimensionsDto,
	DimensionsMetaDto,
	GranularityDto,
	LedgerSideDto,
	TransactionBriefDto,
	WalletOptionDto,
	WalletRefDto,
};

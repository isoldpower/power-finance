import type { MoneyDto } from "@internal/shared";
import type {
	AnalyticsMetaDto,
	AnalyticsParamsDto,
	CategoryRefDto,
	LedgerSideDto,
	TransactionBriefDto,
} from "@feature/filters/ledger-api";


interface CounterpartyDto {
	name: string;
	category: CategoryRefDto | null;
	amount: MoneyDto;
	share: number;
	transactions_count: number;
	average: MoneyDto;
	last_seen_at: string;
}

type TransactionsOrderDto = 'amount_desc' | 'created_desc';

interface CounterpartiesParamsDto extends AnalyticsParamsDto {
	type?: LedgerSideDto;
	limit?: number;
	category?: string[];
}

interface TransactionsParamsDto extends AnalyticsParamsDto {
	type?: LedgerSideDto;
	category?: string[];
	name?: string;
	order?: TransactionsOrderDto;
	limit?: number;
}

interface CounterpartiesMetaDto extends AnalyticsMetaDto {
	total_counterparties: number;
}

interface TransactionsMetaDto extends AnalyticsMetaDto {
	total: number;
	total_inflow: MoneyDto;
	total_outflow: MoneyDto;
}

export type {
	CounterpartiesMetaDto,
	CounterpartiesParamsDto,
	CounterpartyDto,
	TransactionBriefDto,
	TransactionsMetaDto,
	TransactionsOrderDto,
	TransactionsParamsDto,
};

import type { MoneyDto } from "@internal/shared";
import type { AnalyticsMetaDto, AnalyticsParamsDto, WalletOptionDto } from "@feature/filters/ledger-api";


interface WalletBalanceSeriesDto {
	wallet: WalletOptionDto;
	balances: MoneyDto[];
	native_balances: MoneyDto[];
}

interface BalanceHistoryDto {
	timestamps: string[];
	total: MoneyDto[];
	wallets: WalletBalanceSeriesDto[];
}

interface BalanceHistoryParamsDto extends AnalyticsParamsDto {
	points?: number;
}

interface BalanceHistoryMetaDto extends AnalyticsMetaDto {
	points: number;
}

export type { BalanceHistoryDto, BalanceHistoryMetaDto, BalanceHistoryParamsDto, WalletBalanceSeriesDto };

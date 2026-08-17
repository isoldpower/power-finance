import { parseAmount } from "@shared/api";
import type { MoneyDto } from "@shared/api";
import type { CurrencyMeta, CurrencyRates, Money, MoneyConversion } from "@entity/localization";
import type { CurrencyConversionDto, CurrencyDto, CurrencyRatesDto } from "../types.ts";

const moneyFromApi = (dto: MoneyDto): Money => ({
	amount: parseAmount(dto.amount),
	currency: dto.currency,
});

const currencyFromApi = (dto: CurrencyDto): CurrencyMeta => ({
	code: dto.code,
	symbol: dto.symbol,
	name: dto.name,
	decimals: dto.decimals,
});

const conversionFromApi = (dto: CurrencyConversionDto, fetchedAt: string): MoneyConversion => ({
	from: moneyFromApi(dto.from),
	to: moneyFromApi(dto.to),
	rate: parseAmount(dto.rate),
	fetchedAt,
});

const ratesFromApi = (dto: CurrencyRatesDto, fetchedAt: string): CurrencyRates => ({
	base: dto.base,
	rates: Object.fromEntries(
		Object.entries(dto.rates).map(([code, rate]) => [code, parseAmount(rate)]),
	),
	fetchedAt,
});

export { conversionFromApi, currencyFromApi, moneyFromApi, ratesFromApi };

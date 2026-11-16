import type { MoneyDto } from "@internal/shared";
import type { CurrencyRates, Money, MoneyConversion } from "@entity/localization";
import type { CurrencyConversionDto, CurrencyRatesDto } from "../types.ts";


const moneyFromApi = (dto: MoneyDto): Money => ({
	amount: dto.amount,
	currency: dto.currency,
});

const conversionFromApi = (dto: CurrencyConversionDto, fetchedAt: string): MoneyConversion => ({
	from: moneyFromApi(dto.from),
	to: moneyFromApi(dto.to),
	rate: dto.rate,
	fetchedAt,
});

const ratesFromApi = (dto: CurrencyRatesDto, fetchedAt: string): CurrencyRates => ({
	base: dto.base,
	rates: dto.rates,
	fetchedAt,
});

export { conversionFromApi, moneyFromApi, ratesFromApi };

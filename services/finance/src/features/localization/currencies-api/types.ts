import type { CurrencyDto, MoneyDto } from "@internal/shared";


interface CurrencyConversionDto {
	from: MoneyDto;
	to: MoneyDto;
	rate: string;
}

interface CurrencyRatesDto {
	base: string;
	rates: Record<string, string>;
}

interface CurrencyConvertParams {
	from_code: string;
	to_code: string;
	amount: string;
}

interface CurrencyRatesParams {
	target?: string[];
}

export type { CurrencyConversionDto, CurrencyConvertParams, CurrencyDto, CurrencyRatesDto, CurrencyRatesParams };

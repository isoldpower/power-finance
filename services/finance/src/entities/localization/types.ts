interface TimezoneMeta {
	id: string;
	city: string;
	area: string;
	offset: string;
}

interface Money {
	amount: string;
	currency: string;
}

interface ConvertedMoney {
	amount: string;
	currency: string;
	formatted: string;
	converted: boolean;
}

interface MoneyConversion {
	from: Money;
	to: Money;
	rate: string;
	fetchedAt: string;
}

interface CurrencyRates {
	base: string;
	rates: Record<string, string>;
	fetchedAt: string;
}

export type { TimezoneMeta };
export type { CurrencyMeta, LocaleMeta, LocalePickerVariant } from "@internal/shared";
export type { Money, ConvertedMoney, MoneyConversion, CurrencyRates };

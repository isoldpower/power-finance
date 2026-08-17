interface CurrencyMeta {
	code: string;
	symbol: string;
	name: string;
	decimals: number;
}

interface LocaleMeta {
	tag: string;
	name: string;
	region: string;
}

export type { CurrencyMeta, LocaleMeta };

interface Money {
	amount: number;
	currency: string;
}

interface ConvertedMoney {
	amount: number;
	currency: string;
	formatted: string;
	converted: boolean;
}

interface MoneyConversion {
	from: Money;
	to: Money;
	rate: number;
	fetchedAt: string;
}

interface CurrencyRates {
	base: string;
	rates: Record<string, number>;
	fetchedAt: string;
}

export type { Money, ConvertedMoney, MoneyConversion, CurrencyRates };

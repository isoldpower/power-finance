interface CurrencyMeta {
	code: string;
	symbol: string;
	name: string;
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

export type { Money, ConvertedMoney };

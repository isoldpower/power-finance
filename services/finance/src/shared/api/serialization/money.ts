interface MoneyDto {
	amount: string;
	currency: string;
}

const AMOUNT_PATTERN = /^-?(0|[1-9][0-9]*)(\.[0-9]+)?$/;

const isCanonicalAmount = (amount: string): boolean => AMOUNT_PATTERN.test(amount);

const parseAmount = (amount: string): number => {
	const parsed = Number.parseFloat(amount);

	return Number.isNaN(parsed) ? 0 : parsed;
};

const serializeAmount = (amount: number, decimals = 2): string => {
	const normalized = Object.is(amount, -0) ? 0 : amount;

	return normalized.toFixed(decimals);
};

const toAmountString = (amount: number): string => {
	const normalized = Object.is(amount, -0) ? 0 : amount;
	const plain = Math.abs(normalized) >= 1e21 || (normalized !== 0 && Math.abs(normalized) < 1e-6)
		? normalized.toFixed(12).replace(/0+$/, '').replace(/\.$/, '')
		: String(normalized);

	return isCanonicalAmount(plain) ? plain : '0';
};

export { AMOUNT_PATTERN, isCanonicalAmount, parseAmount, serializeAmount, toAmountString };
export type { MoneyDto };

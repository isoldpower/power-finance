interface MoneyDto {
	amount: string;
	currency: string;
}

function isCanonicalAmount(amount: string): boolean {
	const amountPattern = /^-?(0|[1-9][0-9]*)(\.[0-9]+)?$/;
	
	return amountPattern.test(amount);
}

function parseAmount(amount: string): number {
	const parsed = Number.parseFloat(amount);

	return Number.isNaN(parsed) ? 0 : parsed;
}

function toAmountString(amount: number): string {
	const normalized = Object.is(amount, -0) ? 0 : amount;
	const plain = Math.abs(normalized) >= 1e21 || (normalized !== 0 && Math.abs(normalized) < 1e-6)
		? normalized.toFixed(12).replace(/0+$/, '').replace(/\.$/, '')
		: String(normalized);

	return isCanonicalAmount(plain) ? plain : '0';
}

export { isCanonicalAmount, parseAmount, toAmountString };
export type { MoneyDto };

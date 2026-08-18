import { sanitizeAmountInput } from "./sanitize-amount-input.ts";


const FALLBACK_AMOUNT = 0;

const parseAmountInput = (formatted: string): number => {
	const parsed = Number(sanitizeAmountInput(formatted));

	if (Number.isNaN(parsed)) {
		return FALLBACK_AMOUNT;
	}

	return parsed;
};

export { parseAmountInput };

import { sanitizeAmountInput } from "./sanitize-amount-input.ts";


function parseAmountInput(formatted: string): number {
	const parsedInput = Number(sanitizeAmountInput(formatted));

	return Number.isNaN(parsedInput) ? 0 : parsedInput;
}

export { parseAmountInput };

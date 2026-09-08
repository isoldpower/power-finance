import { isCanonicalAmount, ZERO_AMOUNT } from "@shared/api";

import { sanitizeAmountInput } from "./sanitize-amount-input.ts";


function parseAmountDecimal(formatted: string): string {
	const sanitized = sanitizeAmountInput(formatted);

	return isCanonicalAmount(sanitized) ? sanitized : ZERO_AMOUNT;
}

export { parseAmountDecimal };

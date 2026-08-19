import { DECIMAL_SEPARATOR } from "./config.ts";
import { groupThousands } from "./group-thousands.ts";
import { sanitizeAmountInput } from "./sanitize-amount-input.ts";


function formatAmountInput(raw: string, symbol: string): string {
	const sanitizedInput = sanitizeAmountInput(raw);
	if (sanitizedInput === '') {
		return '';
	}

	const separatorIndex = sanitizedInput.indexOf(DECIMAL_SEPARATOR);
	if (separatorIndex === -1) {
		return `${symbol}${groupThousands(sanitizedInput)}`;
	}

	const wholePart = groupThousands(sanitizedInput.slice(0, separatorIndex));
	const fractionPart = sanitizedInput.slice(separatorIndex + 1);

	return `${symbol}${wholePart}${DECIMAL_SEPARATOR}${fractionPart}`;
}

export { formatAmountInput };

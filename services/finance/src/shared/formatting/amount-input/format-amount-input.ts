import { DECIMAL_SEPARATOR } from "./config.ts";
import { groupThousands } from "./group-thousands.ts";
import { sanitizeAmountInput } from "./sanitize-amount-input.ts";


// Formats what the user types into a grouped, symbol-prefixed amount without losing a typed dot.
const formatAmountInput = (raw: string, symbol: string): string => {
	const sanitized = sanitizeAmountInput(raw);

	if (sanitized === '') {
		return '';
	}

	const separatorIndex = sanitized.indexOf(DECIMAL_SEPARATOR);

	if (separatorIndex === -1) {
		return `${symbol}${groupThousands(sanitized)}`;
	}

	const wholePart = groupThousands(sanitized.slice(0, separatorIndex));
	const fractionPart = sanitized.slice(separatorIndex + 1);

	return `${symbol}${wholePart}${DECIMAL_SEPARATOR}${fractionPart}`;
};

export { formatAmountInput };

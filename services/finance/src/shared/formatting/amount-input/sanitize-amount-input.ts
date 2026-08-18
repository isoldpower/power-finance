import { ALLOWED_CHARACTERS_PATTERN, DECIMAL_SEPARATOR } from "./config.ts";


// Keeps only digits and a single decimal point so amount inputs can't take letters.
const sanitizeAmountInput = (raw: string): string => {
	const digitsOnly = raw.replace(ALLOWED_CHARACTERS_PATTERN, '');
	const [wholePart, ...fractionParts] = digitsOnly.split(DECIMAL_SEPARATOR);

	if (fractionParts.length === 0) {
		return wholePart;
	}

	return `${wholePart}${DECIMAL_SEPARATOR}${fractionParts.join('')}`;
};

export { sanitizeAmountInput };

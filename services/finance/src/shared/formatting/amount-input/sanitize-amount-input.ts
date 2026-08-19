import { ALLOWED_CHARACTERS_PATTERN, DECIMAL_SEPARATOR } from "./config.ts";


function sanitizeAmountInput(raw: string): string {
	const digitsOnly = raw.replace(ALLOWED_CHARACTERS_PATTERN, '');
	const [wholePart, ...fractionParts] = digitsOnly.split(DECIMAL_SEPARATOR);

	return fractionParts.length === 0 
		? wholePart 
		: `${wholePart}${DECIMAL_SEPARATOR}${fractionParts.join('')}`;
}

export { sanitizeAmountInput };

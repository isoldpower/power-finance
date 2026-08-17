const ALLOWED_CHARACTERS_PATTERN = /[^0-9.]/g;
const GROUP_BOUNDARY_PATTERN = /\B(?=(\d{3})+(?!\d))/g;
const DECIMAL_SEPARATOR = '.';
const GROUP_SEPARATOR = ',';

// Keeps only digits and a single decimal point so amount inputs can't take letters.
const sanitizeAmountInput = (raw: string): string => {
	const cleaned = raw.replace(ALLOWED_CHARACTERS_PATTERN, '');
	const [whole, ...fractionParts] = cleaned.split(DECIMAL_SEPARATOR);

	if (fractionParts.length === 0) return whole;

	return `${whole}${DECIMAL_SEPARATOR}${fractionParts.join('')}`;
};

const groupThousands = (whole: string): string => {
	return (whole === '' ? '0' : whole).replace(GROUP_BOUNDARY_PATTERN, GROUP_SEPARATOR);
};

// Formats what the user types into a grouped, symbol-prefixed amount without losing a typed dot.
const formatAmountInput = (raw: string, symbol: string): string => {
	const sanitized = sanitizeAmountInput(raw);

	if (sanitized === '') return '';

	const separatorIndex = sanitized.indexOf(DECIMAL_SEPARATOR);

	if (separatorIndex === -1) return `${symbol}${groupThousands(sanitized)}`;

	const whole = groupThousands(sanitized.slice(0, separatorIndex));
	const fraction = sanitized.slice(separatorIndex + 1);

	return `${symbol}${whole}${DECIMAL_SEPARATOR}${fraction}`;
};

const parseAmountInput = (formatted: string): number => {
	return Number(sanitizeAmountInput(formatted)) || 0;
};

export { formatAmountInput, parseAmountInput, sanitizeAmountInput };

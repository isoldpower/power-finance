import { sanitizeAmountInput } from "@shared/formatting";


const formatCurrencyInput = (raw: string): string => {
	const sanitized = sanitizeAmountInput(raw);
	if (sanitized === '') return '';
	const dotIndex = sanitized.indexOf('.');
	const whole = dotIndex === -1 ? sanitized : sanitized.slice(0, dotIndex);
	const grouped = (whole === '' ? '0' : whole).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	return dotIndex === -1 ? `$${grouped}` : `$${grouped}.${sanitized.slice(dotIndex + 1)}`;
};

const parseAmountInput = (formatted: string): number => {
	return Number(sanitizeAmountInput(formatted)) || 0;
};

export { formatCurrencyInput, parseAmountInput };

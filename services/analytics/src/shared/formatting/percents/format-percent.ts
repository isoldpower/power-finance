const NEW_VALUE_LABEL = 'new';

const signSymbol = (value: number): string => {
	if (value > 0) {
		return '+';
	}

	return value < 0 ? '−' : '';
};

const formatPercent = (value: number, fractionDigits = 1): string => `${value.toFixed(fractionDigits)}%`;

const formatSignedPercent = (value: number, fractionDigits = 1): string => {
	return `${signSymbol(value)}${Math.abs(value).toFixed(fractionDigits)}%`;
};

const formatChangePercent = (change: number | null, fractionDigits = 1): string => {
	return change === null ? NEW_VALUE_LABEL : formatSignedPercent(change, fractionDigits);
};

export { formatChangePercent, formatPercent, formatSignedPercent, NEW_VALUE_LABEL, signSymbol };

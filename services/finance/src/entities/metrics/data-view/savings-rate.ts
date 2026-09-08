const UNDEFINED_RATE_LABEL = '—';

const formatSavingsRate = (savingsRate: number | null): string => {
	return savingsRate === null
		? UNDEFINED_RATE_LABEL
		: `${Math.round(savingsRate).toString()}%`;
};

export { formatSavingsRate, UNDEFINED_RATE_LABEL };

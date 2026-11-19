const SERIES_SLOTS = 7;

const OTHER_SERIES_COLOR = 'var(--series-other)';
const INFLOW_COLOR = 'var(--pos)';
const OUTFLOW_COLOR = 'var(--neg)';
const ACCENT_COLOR = 'var(--primary)';
const GRID_COLOR = 'var(--chart-grid)';
const MUTED_INK = 'var(--text-3)';
const TOTAL_INK = 'var(--text)';

const seriesColor = (slot: number): string => {
	return slot >= 0 && slot < SERIES_SLOTS ? `var(--series-${(slot + 1).toString()})` : OTHER_SERIES_COLOR;
};

export {
	ACCENT_COLOR,
	GRID_COLOR,
	INFLOW_COLOR,
	MUTED_INK,
	OTHER_SERIES_COLOR,
	OUTFLOW_COLOR,
	SERIES_SLOTS,
	seriesColor,
	TOTAL_INK,
};

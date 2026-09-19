import type { WalletPeriod } from "../types.ts";


const PERIOD_LABEL: Record<WalletPeriod, string> = {
	last_week: 'Last 7 Days',
	last_month: 'Last 30 Days',
	last_year: 'Last 365 Days',
	all_time: 'All Time',
};

const walletPeriodLabel = (period: WalletPeriod): string => {
	return PERIOD_LABEL[period];
}

export { walletPeriodLabel };

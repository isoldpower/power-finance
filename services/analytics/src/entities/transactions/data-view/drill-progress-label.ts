import type { DrillTransactions } from "../types.ts";


const LOADING_LABEL = 'Loading…';

const drillProgressLabel = (transactions: DrillTransactions | undefined): string => {
	if (!transactions) {
		return LOADING_LABEL;
	}

	const shown = transactions.transactions.length.toString();
	const total = transactions.total.toString();

	return `Showing ${shown} of ${total}`;
};

export { drillProgressLabel };

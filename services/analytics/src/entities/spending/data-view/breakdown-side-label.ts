import type { LedgerSide } from "@entity/filters";


const BREAKDOWN_TOTAL_LABEL: Record<LedgerSide, string> = {
	expense: 'Spent',
	income: 'Earned',
};

const breakdownTotalLabel = (side: LedgerSide): string => BREAKDOWN_TOTAL_LABEL[side];

export { breakdownTotalLabel };

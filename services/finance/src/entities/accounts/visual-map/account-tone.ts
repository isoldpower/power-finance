import { isNegativeAmount } from "@shared/api";

import type { Types } from "@shared/formatting";


const accountAmountTone = (amount: string): Types => {
	return isNegativeAmount(amount) ? 'neg' : 'pos';
};

const ledgerIconClass = (amount: string): string => {
	return isNegativeAmount(amount) ? 'bg-[var(--accent-soft)] text-primary' : 'bg-pos-soft text-pos';
};

const ledgerSideTone = (debit: boolean): Types => {
	return debit ? 'pos' : 'neg';
};

export { accountAmountTone, ledgerIconClass, ledgerSideTone };

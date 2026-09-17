import { isNegativeAmount } from "@shared/api";

import type { Types } from "@shared/formatting";


type LedgerSideTone = 'accent' | 'neutral';

const accountAmountTone = (amount: string): Types => {
	return isNegativeAmount(amount) ? 'neg' : 'pos';
};

const accountBalanceTone = (amount: string): Types => {
	return isNegativeAmount(amount) ? 'neg' : 'neutral';
};

const ledgerIconClass = (amount: string): string => {
	return isNegativeAmount(amount) ? 'bg-neg-soft text-neg' : 'bg-pos-soft text-pos';
};

const ledgerSideTone = (debit: boolean): LedgerSideTone => {
	return debit ? 'accent' : 'neutral';
};

export { accountAmountTone, accountBalanceTone, ledgerIconClass, ledgerSideTone };
export type { LedgerSideTone };

import type { Types } from "@shared/formatting";


const accountAmountTone = (amount: number): Types => {
	return amount >= 0 ? 'pos' : 'neg';
};

const ledgerIconClass = (amount: number): string => {
	return amount >= 0 ? 'bg-pos-soft text-pos' : 'bg-[var(--accent-soft)] text-primary';
};

const ledgerSideTone = (debit: boolean): Types => {
	return debit ? 'pos' : 'neg';
};

export { accountAmountTone, ledgerIconClass, ledgerSideTone };

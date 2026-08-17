import type { Tone } from "@shared/formatting";


const accountAmountTone = (amount: number): Tone => {
	return amount >= 0 ? 'pos' : 'neg';
};

const ledgerIconClass = (amount: number): string => {
	return amount >= 0 ? 'bg-pos-soft text-pos' : 'bg-[var(--accent-soft)] text-primary';
};

const ledgerSideTone = (debit: boolean): Tone => {
	return debit ? 'pos' : 'neg';
};

export { accountAmountTone, ledgerIconClass, ledgerSideTone };

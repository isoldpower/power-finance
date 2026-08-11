import type { Tone } from "@shared/formatting";
import type { LedgerSide } from "../types.ts";


const accountAmountTone = (amount: number): Tone => {
	return amount >= 0 ? 'pos' : 'neg';
};

const ledgerIconClass = (amount: number): string => {
	return amount >= 0 ? 'bg-pos-soft text-pos' : 'bg-[var(--accent-soft)] text-primary';
};

const ledgerSideTone = (side: LedgerSide): Tone => {
	return side === 'DR' ? 'pos' : 'neg';
};

export { accountAmountTone, ledgerIconClass, ledgerSideTone };

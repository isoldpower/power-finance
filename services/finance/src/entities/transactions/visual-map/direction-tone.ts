import type { TransactionType } from "../types.ts";
import type { Tone } from "@shared/formatting";


const toneByType: Record<TransactionType, Tone> = {
	income: 'pos',
	expense: 'neg',
};

const resolveToneWithDirection = (type: TransactionType): Tone => {
	return toneByType[type];
};

export { resolveToneWithDirection };

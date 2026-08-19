import type { TransactionType } from "../types.ts";
import type { Types } from "@shared/formatting";


const toneByType: Record<TransactionType, Types> = {
	income: 'pos',
	expense: 'neg',
};

const resolveToneWithDirection = (type: TransactionType): Types => {
	return toneByType[type];
};

export { resolveToneWithDirection };

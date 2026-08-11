import type { TransactionDirection } from "../types.ts";
import type { Tone } from "@shared/formatting";


const toneByDirection: Record<TransactionDirection, Tone> = {
	in: 'pos',
	out: 'neg',
};

const resolveToneWithDirection = (direction: TransactionDirection): Tone => {
	return toneByDirection[direction];
}

export { resolveToneWithDirection };

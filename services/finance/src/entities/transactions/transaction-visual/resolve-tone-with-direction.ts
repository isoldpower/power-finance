import type {TransactionDirection} from "@entity/transactions";
import type {Tone} from "@shared/utils";


const toneByDirection: Record<TransactionDirection, Tone> = {
	in: 'pos',
	out: 'neg',
};

export const resolveToneWithDirection = (direction: TransactionDirection): Tone => {
	return toneByDirection[direction];
}
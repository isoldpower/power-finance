import type { LedgerSide } from "@entity/filters";


type ChangeTone = 'pos' | 'neg' | 'neutral';

const NEUTRAL_BAND = 1;

const changeTone = (change: number | null, side: LedgerSide): ChangeTone => {
	if (change === null || Math.abs(change) < NEUTRAL_BAND) {
		return 'neutral';
	}

	const grew = change > 0;

	return (side === 'income') === grew ? 'pos' : 'neg';
};

export { changeTone };
export type { ChangeTone };

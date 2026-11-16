import type { KpiDeltaTone } from "../kpi-tile";


type ChangePreference = 'higher' | 'lower' | 'neutral';

const NEUTRAL_BAND = 0.5;

const deltaTone = (change: number | null, preference: ChangePreference): KpiDeltaTone => {
	if (change === null || preference === 'neutral' || Math.abs(change) < NEUTRAL_BAND) {
		return 'neutral';
	}

	const improved = preference === 'higher' ? change > 0 : change < 0;

	return improved ? 'pos' : 'neg';
};

export { deltaTone };
export type { ChangePreference };

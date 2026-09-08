import type { NetDiff, NetDiffSign } from "../types.ts";


const NEW_GROWTH_LABEL = 'New';
const NO_CHANGE_LABEL = 'No change';

const netDiffBadgeLabel = (netDiff: NetDiff, sign: NetDiffSign): string => {
	if (netDiff.percentage === null) {
		return netDiff.direction === 'flat' ? NO_CHANGE_LABEL : NEW_GROWTH_LABEL;
	}

	return `${sign}${Math.abs(netDiff.percentage).toString()}%`;
};

export { netDiffBadgeLabel, NEW_GROWTH_LABEL, NO_CHANGE_LABEL };

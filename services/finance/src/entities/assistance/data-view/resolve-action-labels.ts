import type { ActionLabels, ActionType } from "../types.ts";


const LABELS_BY_KIND: Record<ActionType, ActionLabels> = {
	recurring: {
		primary: 'Approve',
		secondary: 'Skip',
	},
	duplicate: {
		primary: 'Merge',
		secondary: 'Keep both',
	},
	uncategorized: {
		primary: 'Review',
		secondary: 'Later',
	},
};

const resolvePrimaryLabel = (kind: ActionType): string => {
	return LABELS_BY_KIND[kind].primary;
}

const resolveSecondaryLabel = (kind: ActionType): string => {
	return LABELS_BY_KIND[kind].secondary;
}

export { resolvePrimaryLabel, resolveSecondaryLabel };

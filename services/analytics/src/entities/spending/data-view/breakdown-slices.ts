import { parseAmount } from "@internal/shared";
import { categoryKey, categoryLabel, OTHER_KEY, OTHER_LABEL } from "../category-label";

import type { CategoryBreakdown, CategoryShare } from "../types.ts";
import type { BreakdownSlice } from "./types.ts";


const toSlice = (share: CategoryShare): BreakdownSlice => ({
	key: categoryKey(share.category),
	category: share.category,
	label: categoryLabel(share.category),
	value: parseAmount(share.amount.amount),
	share: share.share,
	previousValue: parseAmount(share.previousAmount.amount),
	changePercentage: share.changePercentage,
	transactionsCount: share.transactionsCount,
	isOther: false,
});

const foldOther = (rest: BreakdownSlice[]): BreakdownSlice => {
	const value = rest.reduce((sum, slice) => sum + slice.value, 0);
	const previousValue = rest.reduce((sum, slice) => sum + slice.previousValue, 0);

	return {
		key: OTHER_KEY,
		category: null,
		label: OTHER_LABEL,
		value,
		share: rest.reduce((sum, slice) => sum + slice.share, 0),
		previousValue,
		changePercentage: previousValue === 0 ? null : ((value - previousValue) / previousValue) * 100,
		transactionsCount: rest.reduce((sum, slice) => sum + slice.transactionsCount, 0),
		isOther: true,
	};
};

const toBreakdownSlices = (breakdown: CategoryBreakdown, limit: number): BreakdownSlice[] => {
	const slices = breakdown.categories.map(toSlice);
	if (slices.length <= limit) {
		return slices;
	}

	return [
		...slices.slice(0, limit - 1),
		foldOther(slices.slice(limit - 1))
	];
};

const withoutOtherSlice = (slices: BreakdownSlice[]): BreakdownSlice[] => {
	return slices.filter((slice) => !slice.isOther);
};

export { toBreakdownSlices, withoutOtherSlice };

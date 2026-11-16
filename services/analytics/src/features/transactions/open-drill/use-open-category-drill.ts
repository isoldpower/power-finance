import { useCallback } from "react";
import { useAnalyticsFilters } from "@feature/filters";

import type { LedgerSide } from "@entity/filters";
import type { CategoryRef } from "@entity/spending";


interface CategoryDrillTarget {
	category: CategoryRef | null;
	isOther: boolean;
}

const useOpenCategoryDrill = (side: LedgerSide): ((target: CategoryDrillTarget) => void) => {
	const openDrill = useAnalyticsFilters((state) => state.openDrill);

	return useCallback((target: CategoryDrillTarget) => {
		if (!target.isOther) {
			openDrill({ kind: 'category', side, category: target.category });
		}
	}, [openDrill, side]);
};

export { useOpenCategoryDrill };
export type { CategoryDrillTarget };

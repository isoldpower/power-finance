import { use } from "react";
import { useStore } from "zustand";
import { AnalyticsFiltersContext } from "./store-partials/context.ts";

import type { AnalyticsFiltersState } from "./types.ts";


function useAnalyticsFilters<T>(selector: (state: AnalyticsFiltersState) => T): T {
	const store = use(AnalyticsFiltersContext);

	if (!store) {
		throw new Error('useAnalyticsFilters must be used within AnalyticsFiltersProvider');
	}

	return useStore(store, selector);
}

export { useAnalyticsFilters };

import { createStore } from "zustand";
import { persist } from "zustand/middleware";

import type { StoreApi } from "zustand";
import type { PersistOptions } from "zustand/middleware";
import type { AnalyticsFilters, AnalyticsFiltersState, PersistedFilters } from "../types.ts";


const INITIAL_FILTERS: AnalyticsFilters = {
	preset: '3M',
	customRange: null,
	walletIds: [],
	drill: null,
};

const persistence: PersistOptions<AnalyticsFiltersState, PersistedFilters> = {
	name: 'analytics-filters',
	version: 1,
	partialize: (state) => ({
		preset: state.preset,
		customRange: state.customRange,
		walletIds: state.walletIds,
	}),
};

const createAnalyticsFiltersStore = (initial: Partial<AnalyticsFilters>): StoreApi<AnalyticsFiltersState> => {
	return createStore<AnalyticsFiltersState>()(persist((setState) => ({
		...INITIAL_FILTERS,
		...initial,
		choosePreset: (preset) => { 
			setState({ preset, customRange: null, drill: null }); 
		},
		chooseCustomRange: (range) => {
			setState({ preset: 'custom', customRange: range, drill: null });
		},
		toggleWallet: (walletId) => {
			setState((state) => ({
				walletIds: state.walletIds.includes(walletId)
					? state.walletIds.filter((id) => id !== walletId)
					: [...state.walletIds, walletId],
				drill: null,
			}));
		},
		clearWallets: () => {
			setState({ walletIds: [], drill: null });
		},
		openDrill: (drill) => {
			setState({ drill });
		},
		closeDrill: () => {
			setState({ drill: null });
		},
	}), persistence));
};

export { createAnalyticsFiltersStore };

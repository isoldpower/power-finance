import { use } from "react";
import { useStore } from "zustand";
import { MetricsPreferencesReactContext } from "./context.ts";

import type { MetricsPreferencesState } from "./types.ts";


function useMetricsPreferences<T>(selector: (state: MetricsPreferencesState) => T) {
	const context = use(MetricsPreferencesReactContext);
	
	if (!context) {
		throw new Error('MetricsPreferencesReactContext.Provider is missing. useMetricsPreferences<T> must be used within the metrics');
	}
	
	return useStore(context, selector);
}

export { useMetricsPreferences };
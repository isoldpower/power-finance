import { createStore } from "zustand";
import { persist } from 'zustand/middleware';

import type { StoreApi } from "zustand";
import type { PersistOptions } from 'zustand/middleware';
import type { MetricsPeriod, MetricsPreferences, MetricsPreferencesState } from "./types.ts";


const initialState: MetricsPreferences = {
	metricsPeriod: "1W"
};

const persistenceStorageConfig: PersistOptions<MetricsPreferencesState> = {
	name: "metrics-settings",
	version: 1,
	migrate: (_, version) => {
		throw new Error(`Obsolete persisted state configuration (version: ${version.toString()})`);
	}
};

const createMetricsSettingsStore = (
	initialValues: Partial<MetricsPreferences>
): StoreApi<MetricsPreferencesState> => {
	return createStore<MetricsPreferencesState>()(persist((setState) => ({
		...Object.assign(initialValues, initialState),
		changePeriod: (period: MetricsPeriod) => {
			setState(() => ({ metricsPeriod: period }));
		},
	}), persistenceStorageConfig));
}

export { createMetricsSettingsStore };
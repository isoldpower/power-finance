import { createStore } from "zustand";
import { persist } from 'zustand/middleware';

import type { StoreApi } from "zustand";
import type { PersistOptions } from 'zustand/middleware';
import type {SettingsPreferences, SettingsPreferencesState} from "./types.ts";
import type { SettingsTab } from "@entity/configuration";


const initialState: SettingsPreferences = {
	settingsTab: 'preferences',
};

const persistenceStorageConfig: PersistOptions<SettingsPreferencesState> = {
	name: "settings-preferences",
	version: 1,
	migrate: (_, version) => {
		throw new Error(`Obsolete persisted state configuration (version: ${version.toString()})`);
	}
};

const createSettingsPreferencesStore = (
	initialValues: Partial<SettingsPreferences>
): StoreApi<SettingsPreferencesState> => {
	return createStore<SettingsPreferencesState>()(persist((setState) => ({
		...initialState,
		...initialValues,
		changeTab: (tab: SettingsTab) => {
			setState(() => ({ settingsTab: tab }));
		},
	}), persistenceStorageConfig));
}

export { createSettingsPreferencesStore };

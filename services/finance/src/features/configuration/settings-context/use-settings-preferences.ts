import { use } from "react";
import { useStore } from "zustand";

import { SettingsPreferencesReactContext } from "./context.ts";

import type { SettingsPreferencesState } from "./types.ts";


function useSettingsPreferences<T>(selector: (state: SettingsPreferencesState) => T) {
	const context = use(SettingsPreferencesReactContext);

	if (!context) {
		throw new Error('SettingsPreferencesReactContext.Provider is missing. useSettingsPreferences<T> must be used within the settings');
	}

	return useStore(context, selector);
}

export { useSettingsPreferences };

import type { SettingsTab } from "@entity/configuration";

interface SettingsPreferences {
	settingsTab: SettingsTab;
}

interface SettingsPreferencesState extends SettingsPreferences {
	changeTab: (tab: SettingsTab) => void;
}

export type { SettingsPreferences, SettingsPreferencesState };

import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { SETTINGS_SECTIONS } from "@entity/configuration";
import { useRouteSearch } from "@shared/routing";

import { useSettingsPreferences } from "./use-settings-preferences.ts";

import type { FC } from "react";
import type { SettingsTab } from "@entity/configuration";


const isSettingsTab = (value: unknown): value is SettingsTab => {
	return typeof value === 'string' && value in SETTINGS_SECTIONS;
};

const SettingsTabSync: FC = () => {
	const { current } = useRouteSearch();
	const { settingsTab, changeTab } = useSettingsPreferences(
		useShallow((state) => ({
			settingsTab: state.settingsTab,
			changeTab: state.changeTab,
		}))
	);

	useEffect(() => {
		if (!isSettingsTab(current) || current === settingsTab) return;

		changeTab(current);
	}, [current, settingsTab, changeTab]);

	return null;
};

SettingsTabSync.displayName = 'SettingsTabSync';

export { SettingsTabSync };

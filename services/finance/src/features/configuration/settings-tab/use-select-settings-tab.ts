import { useCallback } from "react";
import { useRouteNavigate } from "@shared/routing";

import { useSettingsPreferences } from "../settings-context";

import type { SettingsTab } from "@entity/configuration";


const useSelectSettingsTab = (): (tab: SettingsTab) => void => {
	const changeTab = useSettingsPreferences((state) => state.changeTab);
	const navigateToRoute = useRouteNavigate();

	return useCallback((tab: SettingsTab) => {
		changeTab(tab);
		navigateToRoute('settings', { current: tab });
	}, [changeTab, navigateToRoute]);
};

export { useSelectSettingsTab };

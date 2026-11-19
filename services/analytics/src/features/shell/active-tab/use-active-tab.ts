import { useCallback, useMemo } from "react";
import { useNavigate } from "@tanstack/react-router";
import { getAnalyticsRoute } from "@internal/shared";
import { useRoutePathname } from "../navigation";
import { resolveActiveTab } from "./active-tab-partials/resolve-active-tab.ts";

import type { AnalyticsTabKey } from "@entity/shell";


interface UseActiveTabReturn {
	activeTab: AnalyticsTabKey | null;
	changeTab: (tab: string) => void;
}

const isTabKey = (value: string): value is AnalyticsTabKey => {
	return value === 'overview' || value === 'spending' || value === 'flow';
};

const useActiveTab = (): UseActiveTabReturn => {
	const navigate = useNavigate();
	const pathname = useRoutePathname();
	const activeTab = useMemo(() => resolveActiveTab(pathname), [pathname]);

	const changeTab = useCallback((tab: string) => {
		if (isTabKey(tab)) {
			void navigate({ to: getAnalyticsRoute(tab) });
		}
	}, [navigate]);

	return useMemo(() => ({ 
		activeTab,
		changeTab
	}), [activeTab, changeTab]);
};

export { useActiveTab };
export type { UseActiveTabReturn };

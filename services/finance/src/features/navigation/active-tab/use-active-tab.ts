import { useNavigate, useRouterState } from "@tanstack/react-router";
import { getFinanceRoute } from "@internal/shared";
import { useCallback, useMemo } from "react";
import { resolveActiveTab } from "./resolve-active.ts";

import type { TabKey, NavTab } from "./types.ts";


const useActiveTab = (tabs: NavTab[]) => {
	const navigate = useNavigate();
	const pathname = useRouterState({ 
		select: (state) => state.location.pathname, 
	});
	
	const activeTab = useMemo(() => {
		return resolveActiveTab(pathname);
	}, [pathname]);
	const activeLabel = useMemo(() => {
		return tabs.find((tab) => tab.key === activeTab)?.label ?? 'Dashboard';
	}, [activeTab, tabs]);

	const onTabChange = useCallback((tabValue: string) => {
		if (tabValue) {
			void navigate({
				search: (prev) => prev,	
				to: getFinanceRoute(tabValue as TabKey)
			});
		}
	}, [navigate]);

	return { tabs, activeTab, activeLabel, onTabChange };
};

export { useActiveTab, resolveActiveTab };
export type { TabKey, NavTab };

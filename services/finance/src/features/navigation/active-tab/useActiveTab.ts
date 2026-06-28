import { useNavigate, useRouterState } from "@tanstack/react-router";
import { getFinanceRoute } from "@internal/shared";

import type { TabKey, NavTab } from "../types.ts";

const resolveActiveTab = (pathname: string): TabKey => {
	if (pathname.includes('/management')) return 'management';
	if (pathname.includes('/planning')) return 'planning';
	return 'dashboard';
};

// The available tabs are supplied by the navbar widget (which owns the navigation config).
const useActiveTab = (tabs: NavTab[]) => {
	const navigate = useNavigate();
	const pathname = useRouterState({ select: (state) => state.location.pathname });
	const activeTab = resolveActiveTab(pathname);
	const activeLabel = tabs.find((tab) => tab.key === activeTab)?.label ?? 'Dashboard';

	const onTabChange = (value: string) => {
		if (!value) return;
		void navigate({ to: getFinanceRoute(value as TabKey) });
	};

	return { tabs, activeTab, activeLabel, onTabChange };
};

export { useActiveTab, resolveActiveTab };
export type { TabKey, NavTab };

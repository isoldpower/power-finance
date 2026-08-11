import type { FinanceRoutes } from "@internal/shared";

type TabKey = 'dashboard' | 'management' | 'planning';

interface NavTab {
	key: TabKey;
	label: string;
}

interface PageEntry {
	route: keyof FinanceRoutes;
	label: string;
	hint: string;
}

export type { TabKey, NavTab, PageEntry };

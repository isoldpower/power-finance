import type { FinanceRoutes } from "@internal/shared";

interface PageEntry {
	route: keyof FinanceRoutes;
	label: string;
	hint: string;
}

interface ResultItem {
	key: string;
	label: string;
	meta: string;
	to: string;
}

export type { PageEntry, ResultItem };

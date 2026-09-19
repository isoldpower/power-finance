import type { FinanceRouteKey } from "@shared/routing";


interface SiteTourStop {
	anchor: string;
	route: FinanceRouteKey;
	search?: Record<string, string>;
}

export type { SiteTourStop };

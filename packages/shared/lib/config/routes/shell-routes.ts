import { getAnalyticsRouteInternal } from "./analytics-routes.ts";
import { getFinanceRouteInternal } from "./finance-routes.ts";
import type { AnalyticsRoutes } from "./analytics-routes.ts";
import type { FinanceRoutes } from "./finance-routes.ts";

import { joinRouteSegments } from "../../helpers";


interface ShellRoutes {
	root: string
	landing: string
	auth: {
		root: string
		login: string
		recovery: string
		signup: string
		profile: string
	}
	analyticsPrefix: string
	financePrefix: string
}

const SHELL_ROOT = '';

const shellRoutes: ShellRoutes = {
	root: `${SHELL_ROOT}/`,
	landing: `${SHELL_ROOT}/landing`,
	analyticsPrefix: `${SHELL_ROOT}/analytics`,
	financePrefix: `${SHELL_ROOT}/finance`,
	auth: {
		root: `/auth`,
		login: `${SHELL_ROOT}/auth/login`,
		recovery: `${SHELL_ROOT}/auth/recovery`,
		signup: `${SHELL_ROOT}/auth/signup`,
		profile: `${SHELL_ROOT}/auth/profile`,
	},
}

const getShellRoute = <T extends keyof ShellRoutes>(
	route: T
): ShellRoutes[T] => {
	return shellRoutes[route];
}

const getShellAnalyticsRoute = (route: keyof AnalyticsRoutes): string => {
	return joinRouteSegments(shellRoutes.analyticsPrefix, getAnalyticsRouteInternal(route));
}

const getShellFinanceRoute = (route: keyof FinanceRoutes): string => {
	return joinRouteSegments(shellRoutes.financePrefix, getFinanceRouteInternal(route));
}

export { getShellRoute, getShellFinanceRoute, getShellAnalyticsRoute, };
export type { ShellRoutes };
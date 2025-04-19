import type {AnalyticsRoutes} from "./analytics-routes.ts";
import {FinanceRoutes} from "./finance-routes.ts";

import {getAnalyticsRoute} from './analytics-routes.ts';
import {getFinanceRoute} from "./finance-routes.ts";
import {joinRouteSegments} from "../../helpers";

interface ShellRoutes {
	root: string
	landing: string
	analyticsPrefix: string
	financePrefix: string
}

const SHELL_ROOT = '';

const shellRoutes: ShellRoutes = {
	root: `${SHELL_ROOT}/`,
	landing: `${SHELL_ROOT}/landing`,
	analyticsPrefix: `${SHELL_ROOT}/analytics`,
	financePrefix: `${SHELL_ROOT}/finance`,
}

const getShellRoute = (route: keyof ShellRoutes): string => {
	return shellRoutes[route];
}

const getShellAnalyticsRoute = (route: keyof AnalyticsRoutes): string => {
	return joinRouteSegments(shellRoutes.analyticsPrefix, getAnalyticsRoute(route));
}

const getShellFinanceRoute = (route: keyof FinanceRoutes): string => {
	return joinRouteSegments(shellRoutes.analyticsPrefix, getFinanceRoute(route));
}

export { getShellRoute, getShellFinanceRoute, getShellAnalyticsRoute, };
export type { ShellRoutes };
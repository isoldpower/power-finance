import { getIsEmbedded } from "../../utils";
import { getShellAnalyticsRoute } from "./shell-routes";

interface AnalyticsRoutes {
	root: string;
	overview: string;
	spending: string;
	flow: string;
}

const analyticsRoutes: AnalyticsRoutes = {
	root: '/',
	overview: '/overview',
	spending: '/spending',
	flow: '/flow',
};

const getAnalyticsRouteInternal = (route: keyof AnalyticsRoutes): string => {
	return analyticsRoutes[route];
};

const getAnalyticsRoute = (route: keyof AnalyticsRoutes): string => {
	return getIsEmbedded()
		? getShellAnalyticsRoute(route)
		: getAnalyticsRouteInternal(route);
};

export { getAnalyticsRoute, getAnalyticsRouteInternal };
export type { AnalyticsRoutes };

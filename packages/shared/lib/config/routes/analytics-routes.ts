import { getIsEmbedded } from "../../utils";
import { getShellAnalyticsRoute } from "./shell-routes";

interface AnalyticsRoutes {
	root: string
}

// Routes are set excluding the base that can be applied in the Shell application
const analyticsRoutes: AnalyticsRoutes = {
	root: '/'
}

const getAnalyticsRouteInternal = (route: keyof AnalyticsRoutes): string => {
	return analyticsRoutes[route];
}

const getAnalyticsRoute = (route: keyof AnalyticsRoutes): string => {
	return getIsEmbedded() 
		? getShellAnalyticsRoute(route) 
		: getAnalyticsRouteInternal(route);
}

export { getAnalyticsRoute, getAnalyticsRouteInternal };
export type { AnalyticsRoutes };
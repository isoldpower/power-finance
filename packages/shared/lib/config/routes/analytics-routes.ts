interface AnalyticsRoutes {
	root: string
}

// Routes are set excluding the base that can be applied in the Shell application
const analyticsRoutes: AnalyticsRoutes = {
	root: '/'
}

const getAnalyticsRoute = (route: keyof AnalyticsRoutes): string => {
	return analyticsRoutes[route];
}

export { getAnalyticsRoute };
export type { AnalyticsRoutes };
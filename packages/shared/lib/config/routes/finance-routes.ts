const FINANCE_ROOT = '';

interface FinanceRoutes {
	root: string
	overview: string
}

const financeRoutes: FinanceRoutes = {
	root: `/${FINANCE_ROOT}`,
	overview: `/${FINANCE_ROOT}/overview`
}

const getFinanceRoute = (route: keyof FinanceRoutes): string => {
	return financeRoutes[route];
}

export { getFinanceRoute };
export type { FinanceRoutes };
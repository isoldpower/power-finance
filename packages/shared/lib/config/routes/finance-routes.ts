const FINANCE_ROOT = '';

interface FinanceRoutes {
	root: string
	dashboard: string
}

const financeRoutes: FinanceRoutes = {
	root: `/${FINANCE_ROOT}`,
	dashboard: `${FINANCE_ROOT}/dashboard`
}

const getFinanceRoute = (route: keyof FinanceRoutes): string => {
	return financeRoutes[route];
}

export { getFinanceRoute };
export type { FinanceRoutes };
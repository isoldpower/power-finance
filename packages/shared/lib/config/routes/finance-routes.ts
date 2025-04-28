const FINANCE_ROOT = '';

interface FinanceRoutes {
	root: string
	dashboard: string
	wallets: string
}

const financeRoutes: FinanceRoutes = {
	root: `/${FINANCE_ROOT}`,
	dashboard: `${FINANCE_ROOT}/dashboard`,
	wallets: `${FINANCE_ROOT}/wallets`,
}

const getFinanceRoute = (route: keyof FinanceRoutes): string => {
	return financeRoutes[route];
}

export { getFinanceRoute };
export type { FinanceRoutes };
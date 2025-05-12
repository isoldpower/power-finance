import { getIsEmbedded } from "../../utils";
import { getShellFinanceRoute } from "./shell-routes";

const FINANCE_ROOT = '';

interface FinanceRoutes {
	root: string
	dashboard: string
	wallets: string
	transactions: string
}

const financeRoutes: FinanceRoutes = {
	root: `/${FINANCE_ROOT}`,
	dashboard: `${FINANCE_ROOT}/dashboard`,
	wallets: `${FINANCE_ROOT}/dashboard/wallets`,
	transactions: `${FINANCE_ROOT}/dashboard/transactions`,
}

const getFinanceRouteInternal = (route: keyof FinanceRoutes): string => {
	return financeRoutes[route];
}

const getFinanceRoute = (route: keyof FinanceRoutes): string => {
	return getIsEmbedded() 
		? getShellFinanceRoute(route) 
		: getFinanceRouteInternal(route);
}

export { getFinanceRoute, getFinanceRouteInternal };
export type { FinanceRoutes };
import { createContext, useMemo } from 'react';
import { useDemoSession, WriteVersionStore } from "@internal/shared";
import { resolveApiMode } from "./config.ts";
import { useLedgerApi } from "./servers/use-ledger-api.ts";
import { useOverviewApi } from "./servers/use-overview-api.ts";
import { useCashFlowApi } from "./servers/use-cash-flow-api.ts";
import { useCategoriesApi } from "./servers/use-categories-api.ts";
import { useMoneyFlowApi } from "./servers/use-money-flow-api.ts";
import { usePatternsApi } from "./servers/use-patterns-api.ts";
import { useBalancesApi } from "./servers/use-balances-api.ts";
import { useTransactionsApi } from "./servers/use-transactions-api.ts";
import { useCurrenciesApi } from "./servers/use-currencies-api.ts";

import type { FC, ReactNode } from 'react';
import type { ICurrencyCatalogRESTApiClient } from "@internal/shared";
import type { ILedgerRESTApiClient } from "@feature/filters";
import type { IOverviewRESTApiClient } from "@feature/overview";
import type { ICashFlowRESTApiClient, IMoneyFlowRESTApiClient, IBalancesRESTApiClient } from "@feature/flow";
import type { ICategoriesRESTApiClient, IPatternsRESTApiClient } from "@feature/spending";
import type { ITransactionsRESTApiClient } from "@feature/transactions";
import type { ApiServerOptions } from "./servers/types.ts";


interface ApiContextType {
	ledgerServers: { readonly rest: ILedgerRESTApiClient };
	overviewServers: { readonly rest: IOverviewRESTApiClient };
	cashFlowServers: { readonly rest: ICashFlowRESTApiClient };
	categoryServers: { readonly rest: ICategoriesRESTApiClient };
	moneyFlowServers: { readonly rest: IMoneyFlowRESTApiClient };
	patternServers: { readonly rest: IPatternsRESTApiClient };
	balanceServers: { readonly rest: IBalancesRESTApiClient };
	transactionServers: { readonly rest: ITransactionsRESTApiClient };
	currencyServers: { readonly rest: ICurrencyCatalogRESTApiClient };
}

interface ApiProviderProps {
	readonly children: ReactNode;
	readonly envVariables: ImportMetaEnv;
}

const ApiContext = createContext<ApiContextType | null>(null);

const ApiProvider: FC<ApiProviderProps> = ({
	children,
	envVariables,
}) => {
	const demoSession = useDemoSession();
	const serverOptions = useMemo<ApiServerOptions>(() => ({
		baseUrl: envVariables.CLIENT_API_BASE_URL,
		mode: resolveApiMode(envVariables.CLIENT_API_MODE),
		sandbox: envVariables.CLIENT_API_SANDBOX,
		demoSession,
		versions: new WriteVersionStore(),
	}), [
		envVariables.CLIENT_API_BASE_URL,
		envVariables.CLIENT_API_MODE,
		envVariables.CLIENT_API_SANDBOX,
		demoSession,
	]);

	const ledgerServers = useLedgerApi(serverOptions);
	const overviewServers = useOverviewApi(serverOptions);
	const cashFlowServers = useCashFlowApi(serverOptions);
	const categoryServers = useCategoriesApi(serverOptions);
	const moneyFlowServers = useMoneyFlowApi(serverOptions);
	const patternServers = usePatternsApi(serverOptions);
	const balanceServers = useBalancesApi(serverOptions);
	const transactionServers = useTransactionsApi(serverOptions);
	const currencyServers = useCurrenciesApi(serverOptions);

	const contextValue = useMemo<ApiContextType>(() => ({
		ledgerServers,
		overviewServers,
		cashFlowServers,
		categoryServers,
		moneyFlowServers,
		patternServers,
		balanceServers,
		transactionServers,
		currencyServers,
	}), [
		ledgerServers,
		overviewServers,
		cashFlowServers,
		categoryServers,
		moneyFlowServers,
		patternServers,
		balanceServers,
		transactionServers,
		currencyServers,
	]);

	return (
		<ApiContext value={contextValue}>
			{children}
		</ApiContext>
	);
};

ApiProvider.displayName = 'ApiProvider';

export { ApiContext, ApiProvider };
export type { ApiContextType, ApiProviderProps };

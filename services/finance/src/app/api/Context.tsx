import { createContext, useMemo } from 'react';
import { WriteVersionStore } from "@shared/api";

import { resolveApiMode } from "./config.ts";
import { ApiQueryReactions } from "./query-reactions";
import { ApiToasts } from "./toasts";
import { useWalletsApi } from "./servers/use-wallets-api.ts";
import { useGoalsApi } from "./servers/use-goals-api.ts";
import { useTransactionsApi } from "./servers/use-transactions-api.ts";
import { useWebhooksApi } from "./servers/use-webhooks-api.ts";
import { useMetricsApi } from "./servers/use-metrics-api.ts";
import { useActionsApi } from "./servers/use-actions-api.ts";
import { useAutomationsApi } from "./servers/use-automations-api.ts";
import { useNotificationsApi } from "./servers/use-notifications-api.ts";
import { useAssistantApi } from "./servers/use-assistant-api.ts";
import { useCurrenciesApi } from "./servers/use-currencies-api.ts";
import { useAccountsApi } from "./servers/use-accounts-api.ts";
import { useAuthApi } from "./servers/use-auth-api.ts";

import type { FC } from 'react';
import type { IGoalsRESTApiClient, IWalletsRESTApiClient } from "@feature/wallets";
import type { ITransactionsRESTApiClient } from "@feature/transactions";
import type { IAccountsRESTApiClient } from "@feature/accounts";
import type { IAuthRESTApiClient, IWebhooksRESTApiClient } from "@feature/configuration";
import type { IMetricsRESTApiClient } from "@feature/metrics";
import type { INotificationsRESTApiClient } from "@feature/assistance";
import type { ICurrenciesRESTApiClient } from "@feature/localization";
import type { IActionsRESTApiClient, IAutomationsRESTApiClient, IAssistantRESTApiClient } from "@feature/assistance";
import type { ApiServerOptions } from "./servers/types.ts";


interface ApiContextType {
	walletServers: {
		readonly rest: IWalletsRESTApiClient
	},
	goalServers: {
		readonly rest: IGoalsRESTApiClient
	},
	transactionServers: {
		readonly rest: ITransactionsRESTApiClient
	},
	accountServers: {
		readonly rest: IAccountsRESTApiClient
	},
	webhookServers: {
		readonly rest: IWebhooksRESTApiClient
	},
	authServers: {
		readonly rest: IAuthRESTApiClient
		readonly revision: string
	},
	metricsServers: {
		readonly rest: IMetricsRESTApiClient
	},
	actionServers: {
		readonly rest: IActionsRESTApiClient
	},
	automationServers: {
		readonly rest: IAutomationsRESTApiClient
	},
	notificationServers: {
		readonly rest: INotificationsRESTApiClient
	},
	assistantServers: {
		readonly rest: IAssistantRESTApiClient
	},
	currencyServers: {
		readonly rest: ICurrenciesRESTApiClient
	}
}

interface ApiProviderProps {
  	readonly children: React.ReactNode
	readonly envVariables: ImportMetaEnv
}

const ApiContext = createContext<ApiContextType | null>(null);

const ApiProvider: FC<ApiProviderProps> = ({
	children,
	envVariables
}) => {
	const serverOptions = useMemo<ApiServerOptions>(() => ({
		baseUrl: envVariables.CLIENT_API_BASE_URL,
		mode: resolveApiMode(envVariables.CLIENT_API_MODE),
		sandbox: envVariables.CLIENT_API_SANDBOX,
		versions: new WriteVersionStore(),
	}), [
		envVariables.CLIENT_API_BASE_URL,
		envVariables.CLIENT_API_MODE,
		envVariables.CLIENT_API_SANDBOX,
	]);

	const walletServers = useWalletsApi(serverOptions);
	const goalServers = useGoalsApi(serverOptions);
	const transactionServers = useTransactionsApi(serverOptions);
	const accountServers = useAccountsApi(serverOptions);
	const webhookServers = useWebhooksApi(serverOptions);
	const metricsServers = useMetricsApi(serverOptions);
	const actionServers = useActionsApi(serverOptions);
	const automationServers = useAutomationsApi(serverOptions);
	const notificationServers = useNotificationsApi(serverOptions);
	const assistantServers = useAssistantApi(serverOptions);
	const currencyServers = useCurrenciesApi(serverOptions);
	const authServers = useAuthApi();

	const contextValue = useMemo<ApiContextType>(() => ({
		walletServers,
		goalServers,
		transactionServers,
		accountServers,
		webhookServers,
		metricsServers,
		actionServers,
		assistantServers,
		automationServers,
		notificationServers,
		currencyServers,
		authServers
	}), [
		transactionServers,
		walletServers,
		goalServers,
		accountServers,
		webhookServers,
		metricsServers,
		actionServers,
		automationServers,
		notificationServers,
		assistantServers,
		currencyServers,
		authServers
	]);

	return (
		<ApiContext value={contextValue}>
			<ApiQueryReactions/>
			<ApiToasts/>
			{children}
		</ApiContext>
	);
};

ApiProvider.displayName = 'ApiProvider';

export { ApiProvider, ApiContext };
export type { ApiContextType, ApiProviderProps };

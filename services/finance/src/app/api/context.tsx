import { createContext, useMemo } from 'react';

import { ApiQueryReactions } from "./query-reactions";
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
import type { IAuthRESTApiClient, IWebhookRESTApiClient } from "@feature/configuration";
import type { IMetricsRESTApiClient } from "@feature/metrics";
import type { INotificationsRESTApiClient } from "@feature/assistance";
import type { ICurrenciesRESTApiClient } from "@feature/localization";
import type { IActionsRESTApiClient, IAutomationsRESTApiClient, IAssistantRESTApiClient } from "@feature/assistance";


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
		readonly rest: IWebhookRESTApiClient
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
	const walletServers = useWalletsApi(envVariables.CLIENT_API_BASE_URL);
	const goalServers = useGoalsApi(envVariables.CLIENT_API_BASE_URL);
	const transactionServers = useTransactionsApi(envVariables.CLIENT_API_BASE_URL);
	const accountServers = useAccountsApi(envVariables.CLIENT_API_BASE_URL);
	const webhookServers = useWebhooksApi(envVariables.CLIENT_API_BASE_URL);
	const metricsServers = useMetricsApi(envVariables.CLIENT_API_BASE_URL);
	const actionServers = useActionsApi(envVariables.CLIENT_API_BASE_URL);
	const automationServers = useAutomationsApi(envVariables.CLIENT_API_BASE_URL);
	const notificationServers = useNotificationsApi(envVariables.CLIENT_API_BASE_URL);
	const assistantServers = useAssistantApi(envVariables.CLIENT_API_BASE_URL);
	const currencyServers = useCurrenciesApi(envVariables.CLIENT_API_BASE_URL);
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
			{children}
		</ApiContext>
	);
};

ApiProvider.displayName = 'ApiProvider';

export { ApiProvider, ApiContext };
export type { ApiContextType, ApiProviderProps };

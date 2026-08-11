import { createContext, useMemo } from 'react';

import { ApiQueryReactions } from "./query-reactions";
import { useWalletsApi } from "./servers/use-wallets-api.ts";
import { useTransactionsApi } from "./servers/use-transactions-api.ts";
import { useWebhooksApi } from "./servers/use-webhooks-api.ts";
import { useSummaryApi } from "./servers/use-summary-api.ts";
import { useActionsApi } from "./servers/use-actions-api.ts";
import { useAutomationsApi } from "./servers/use-automations-api.ts";
import { useNotificationsApi } from "./servers/use-notifications-api.ts";
import { useAssistantApi } from "./servers/use-assistant-api.ts";
import { useFxApi } from "./servers/use-fx-api.ts";
import { useAccountsApi } from "./servers/use-accounts-api.ts";
import type { FC } from 'react';
import type { IWalletsRESTApiClient } from "@feature/wallets";
import type { ITransactionsRESTApiClient } from "@feature/transactions";
import type { IAccountsRESTApiClient } from "@feature/accounts";
import type { IWebhookRESTApiClient } from "@feature/configuration";
import type { ISummaryRESTApiClient } from "@feature/metrics";
import type { INotificationsRESTApiClient } from "@feature/assistance";
import type { IFxRESTApiClient } from "@feature/localization";
import type { IActionsRESTApiClient, IAutomationsRESTApiClient, IAssistantRESTApiClient } from "@feature/assistance";


interface ApiContextType {
	walletServers: {
		readonly rest: IWalletsRESTApiClient
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
	summaryServers: {
		readonly rest: ISummaryRESTApiClient
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
	fxServers: {
		readonly rest: IFxRESTApiClient
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
	const transactionServers = useTransactionsApi(envVariables.CLIENT_API_BASE_URL);
	const accountServers = useAccountsApi(envVariables.CLIENT_API_BASE_URL);
	const webhookServers = useWebhooksApi(envVariables.CLIENT_API_BASE_URL);
	const summaryServers = useSummaryApi(envVariables.CLIENT_API_BASE_URL);
	const actionServers = useActionsApi(envVariables.CLIENT_API_BASE_URL);
	const automationServers = useAutomationsApi(envVariables.CLIENT_API_BASE_URL);
	const notificationServers = useNotificationsApi(envVariables.CLIENT_API_BASE_URL);
	const assistantServers = useAssistantApi(envVariables.CLIENT_API_BASE_URL);
	const fxServers = useFxApi(envVariables.CLIENT_API_BASE_URL);

	const contextValue = useMemo<ApiContextType>(() => ({
		walletServers,
		transactionServers,
		accountServers,
		webhookServers,
		summaryServers,
		actionServers,
		assistantServers,
		automationServers,
		notificationServers,
		fxServers
	}), [transactionServers, walletServers, accountServers, webhookServers, summaryServers, actionServers, automationServers, notificationServers, fxServers]);

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

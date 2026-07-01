import { createContext, useMemo } from 'react';

import { ApiQueryReactions } from "./query-reactions";
import { useWalletsApi } from "./servers/useWalletsApi.ts";
import { useTransactionsApi } from "./servers/useTransactionsApi.ts";
import { useWebhooksApi } from "./servers/useWebhooksApi.ts";
import { useSummaryApi } from "./servers/useSummaryApi.ts";
import { useActionsApi } from "./servers/useActionsApi.ts";
import { useAutomationsApi } from "./servers/useAutomationsApi.ts";
import { useNotificationsApi } from "./servers/useNotificationsApi.ts";
import { useFxApi } from "./servers/useFxApi.ts";
import type { FC } from 'react';
import type { IWalletsRESTApiClient } from "@feature/wallet";
import type { ITransactionsRESTApiClient } from "@feature/transaction";
import type { IWebhookRESTApiClient } from "@feature/settings";
import type { ISummaryRESTApiClient } from "@feature/summary";
import type { INotificationsRESTApiClient } from "@feature/notifications";
import type { IFxRESTApiClient } from "@feature/fx";
import type { IActionsRESTApiClient, IAutomationsRESTApiClient } from "@feature/assistance";


interface ApiContextType {
	walletServers: {
		readonly rest: IWalletsRESTApiClient
	},
	transactionServers: {
		readonly rest: ITransactionsRESTApiClient
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
	const webhookServers = useWebhooksApi(envVariables.CLIENT_API_BASE_URL);
	const summaryServers = useSummaryApi(envVariables.CLIENT_API_BASE_URL);
	const actionServers = useActionsApi(envVariables.CLIENT_API_BASE_URL);
	const automationServers = useAutomationsApi(envVariables.CLIENT_API_BASE_URL);
	const notificationServers = useNotificationsApi(envVariables.CLIENT_API_BASE_URL);
	const fxServers = useFxApi(envVariables.CLIENT_API_BASE_URL);

	const contextValue = useMemo<ApiContextType>(() => ({
		walletServers,
		transactionServers,
		webhookServers,
		summaryServers,
		actionServers,
		automationServers,
		notificationServers,
		fxServers
	}), [transactionServers, walletServers, webhookServers, summaryServers, actionServers, automationServers, notificationServers, fxServers]);

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

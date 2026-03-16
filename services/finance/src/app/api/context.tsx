import { createContext, useMemo } from 'react';

import { ApiQueryReactions } from "./query-reactions";
import { useWalletsApi } from "./servers/useWalletsApi.ts";
import { useTransactionsApi } from "./servers/useTransactionsApi.ts";
import { useWebhooksApi } from "./servers/useWebhooksApi.ts";
import type { FC } from 'react';
import type { IWalletsRESTApiClient } from "@feature/wallet";
import type { ITransactionsRESTApiClient } from "@feature/transaction";
import type { IWebhookRESTApiClient } from "@feature/webhook";


interface ApiContextType {
	walletServers: {
		readonly rest: IWalletsRESTApiClient
	},
	transactionServers: {
		readonly rest: ITransactionsRESTApiClient
	},
	webhookServers: {
		readonly rest: IWebhookRESTApiClient
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
	
	const contextValue = useMemo<ApiContextType>(() => ({
		walletServers,
		transactionServers,
		webhookServers
	}), [transactionServers, walletServers, webhookServers]);

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

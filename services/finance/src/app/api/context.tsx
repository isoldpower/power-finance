import { createContext, useMemo } from 'react';

import { ApiQueryReactions } from "./query-reactions";
import type { FC } from 'react';
import type { IWalletsRESTApiClient } from "@feature/wallet";
import type { ITransactionsRESTApiClient } from "@feature/transaction";
import { useWalletsApi } from "./useWalletsApi.ts";
import { useTransactionsApi } from "./useTransactionsApi.ts";


interface ApiContextType {
	walletsClients: {
		readonly rest: IWalletsRESTApiClient
	},
	transactionsClients: {
		readonly rest: ITransactionsRESTApiClient
	},
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
	const walletsClients = useWalletsApi(envVariables.CLIENT_API_BASE_URL);
	const transactionsClients = useTransactionsApi(envVariables.CLIENT_API_BASE_URL);
	
	const contextValue = useMemo<ApiContextType>(() => ({
		walletsClients,
		transactionsClients
	}), [transactionsClients, walletsClients]);

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

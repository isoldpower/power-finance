import { createContext, useMemo } from 'react';

import type { FC } from 'react';
import type { IAnalyticsRESTApiClient } from "@feature/analytics";
import { useAnalyticsApi } from "./useAnalyticsApi.ts";


interface ApiContextType {
	analyticsClients: {
		readonly rest: IAnalyticsRESTApiClient
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
	const analyticsClients = useAnalyticsApi(envVariables.CLIENT_API_BASE_URL);
	
	const contextValue = useMemo<ApiContextType>(() => ({
		analyticsClients
	}), [analyticsClients]);

	return (
		<ApiContext value={contextValue}>
			{children}
		</ApiContext>
	);
};

ApiProvider.displayName = 'ApiProvider';

export { ApiProvider, ApiContext };
export type { ApiContextType, ApiProviderProps };

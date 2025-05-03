import {FC, useRef} from 'react';
import { createContext, useContext, useMemo } from 'react';

import { WalletsMockRESTApiClient } from "@feature/wallet";
import { TransactionMockRESTApiClient } from "@feature/transaction";
import type { IWalletsRESTApiClient } from "@feature/wallet";
import type { ITransactionsRESTApiClient } from "@feature/transaction";


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
}

const ApiContext = createContext<ApiContextType | null>(null);

const ApiProvider: FC<ApiProviderProps> = ({ children }) => {
	const walletsClient = useRef(new WalletsMockRESTApiClient("wallets"));
	const transactionsClient = useRef(new TransactionMockRESTApiClient("transactions", "wallets"));

  const contextValue = useMemo<ApiContextType>(() => ({
    walletsClients: { rest: walletsClient.current },
		transactionsClients: { rest: transactionsClient.current }
  }), []);

  return (
    <ApiContext.Provider value={contextValue}>
      {children}
    </ApiContext.Provider>
  );
};

ApiProvider.displayName = 'ApiProvider';

const useApiContext = () => {
  const context = useContext(ApiContext);

  if (!context) {
    throw new Error('useApiContext must be used within an ApiProvider');
  }

  return context;
};

export { ApiProvider, useApiContext };
export type { ApiContextType, ApiProviderProps };

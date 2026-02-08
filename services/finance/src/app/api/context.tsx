import { useRef } from 'react';
import { createContext, useMemo } from 'react';

import { ApiQueryReactions } from "./query-reactions";
import { WalletsMockRESTApiClient } from "@feature/wallet";
import {TransactionMockRESTApiClient, TransactionTestRESTApiClient} from "@feature/transaction";
import type { FC } from 'react';
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
		walletsClients: {rest: walletsClient.current},
		transactionsClients: {rest: transactionsClient.current}
	}), []);

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

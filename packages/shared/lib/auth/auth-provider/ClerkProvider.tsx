import {createContext, PropsWithChildren, useContext, useMemo} from "react";
import { ClerkProvider as OriginalClerkProvider } from "@clerk/clerk-react";
import type { ClerkProviderProps as OriginalClerkProviderProps } from "@clerk/clerk-react";

import type { FC } from "react";

const ClerkBridgeContext = createContext(false);

type ClerkBridgeProviderProps = PropsWithChildren;

const ClerkBridgeProvider: FC<ClerkBridgeProviderProps> = ({ children }) => (
	<ClerkBridgeContext.Provider value={true}>
		{children}
	</ClerkBridgeContext.Provider>
);

function useIsClerkProvided(): boolean {
	const bridgeContext = useContext(ClerkBridgeContext);
	
	return useMemo(() => {
		return bridgeContext !== undefined && bridgeContext !== null
	}, [bridgeContext]);
}

type ClerkProviderProps = OriginalClerkProviderProps;

const ClerkProvider: FC<ClerkProviderProps> = ({ 
	children, 
	...props
}) => (
	<OriginalClerkProvider {...props}>
		<ClerkBridgeProvider>
			{children}
		</ClerkBridgeProvider>
	</OriginalClerkProvider>
);


export { ClerkProvider, useIsClerkProvided };
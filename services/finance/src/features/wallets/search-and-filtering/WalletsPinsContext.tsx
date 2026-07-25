import {createContext, FC, ReactNode, use, useCallback, useMemo, useState} from "react";


interface WalletsPinsContextType {
	pinnedIds: Record<string, boolean>;
	isPinned: (id: string) => boolean;
	togglePin: (id: string) => void;
}

const WalletsPinsContext = createContext<WalletsPinsContextType | null>(null);


interface WalletsPinsContextProviderProps {
	children: ReactNode;
}

const WalletsPinsContextProvider: FC<WalletsPinsContextProviderProps> = ({
	children,
}) => {
	const [pinnedIds, setPinnedIds] = useState<Record<string, boolean>>({});

	const togglePinCallback = useCallback((walletId: string) => {
		setPinnedIds((previous) => {
			const newPinnedDict = { ...previous };
			if (newPinnedDict[walletId]) {
				delete newPinnedDict[walletId];
			} else {
				newPinnedDict[walletId] = true;
			}
			
			return newPinnedDict;
		});
	}, []);
	const isPinnedCallback = useCallback((id: string) => {
		return pinnedIds[id];
	}, [pinnedIds]);

	const pinsValues = useMemo<WalletsPinsContextType>(() => ({
		pinnedIds,
		isPinned: isPinnedCallback,
		togglePin: togglePinCallback,
	}), [isPinnedCallback, pinnedIds, togglePinCallback]);

	return (
		<WalletsPinsContext value={pinsValues}>
			{children}
		</WalletsPinsContext>
	);
}

const useWalletsPinsContext = () => {
	const context = use(WalletsPinsContext);

	if (!context) {
		throw new Error('useWalletsPinsContext must be used within the context');
	}

	return context;
}

export { WalletsPinsContextProvider, useWalletsPinsContext };

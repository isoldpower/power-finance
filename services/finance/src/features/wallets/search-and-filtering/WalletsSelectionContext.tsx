import {createContext, FC, ReactNode, use, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useSearchProtected} from "@feature/navigation";
import {z} from "zod";
import {Wallet} from "@entity/wallets";


interface WalletsSelectionContextType {
	selectedWalletId: string | null;
	selectWallet: (id: string | null) => void;
}

const WalletsSelectionContext = createContext<WalletsSelectionContextType | null>(null);

const searchParams = z.object({
	wallet: z.string().min(1).default('none'),
});
type SearchParams = z.infer<typeof searchParams>;

interface WalletsSelectionContextProviderProps {
	children: ReactNode;
	walletsRegistry: Wallet[];
}

const WalletsSelectionContextProvider: FC<WalletsSelectionContextProviderProps> = ({
	children,
	walletsRegistry,
}) => {
	const [selectedWalletId, selectWallet] = useState<string | null>(null);
	const [search, setSearch] = useSearchProtected<SearchParams>(searchParams);
	const hydratedFromUrl = useRef(false);

	const selectWalletCallback = useCallback((newWalletId: string | null) => {
		const protectedWalletId = newWalletId && walletsRegistry.find((wallet) => wallet.id === newWalletId)
			? newWalletId
			: 'none';
		
		selectWallet(protectedWalletId);
		setSearch({ wallet: protectedWalletId });
	}, [setSearch, walletsRegistry]);

	const selectionValues = useMemo<WalletsSelectionContextType>(() => ({
		selectedWalletId,
		selectWallet: selectWalletCallback,
	}), [selectWalletCallback, selectedWalletId]);

	useEffect(() => {
		if (hydratedFromUrl.current || walletsRegistry.length === 0) {
			return;
		}

		hydratedFromUrl.current = true;
		selectWalletCallback(search.wallet === 'none' ? null : search.wallet);
	}, [search.wallet, selectWalletCallback, walletsRegistry]);

	return (
		<WalletsSelectionContext value={selectionValues}>
			{children}
		</WalletsSelectionContext>
	);
}

const useWalletsSelectionContext = () => {
	const context = use(WalletsSelectionContext);

	if (!context) {
		throw new Error('useWalletsSelectionContext must be used within the context');
	}

	return context;
}

export { WalletsSelectionContextProvider, useWalletsSelectionContext };

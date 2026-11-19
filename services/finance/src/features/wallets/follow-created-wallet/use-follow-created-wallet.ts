import { useCallback } from "react";
import { useShallow } from "zustand/react/shallow";
import { isOptimisticWalletId } from "../data-presenters";
import { useWalletsSelection } from "../selection-context";


const useFollowCreatedWallet = (): (walletId: string) => void => {
	const { selectedWalletId, selectWallet } = useWalletsSelection(
		useShallow((state) => ({
			selectedWalletId: state.selectedWalletId,
			selectWallet: state.selectWallet,
		}))
	);

	return useCallback((walletId: string) => {
		if (selectedWalletId !== null && isOptimisticWalletId(selectedWalletId)) {
			selectWallet(walletId);
		}
	}, [selectedWalletId, selectWallet]);
};

export { useFollowCreatedWallet };

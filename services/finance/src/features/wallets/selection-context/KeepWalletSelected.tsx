import { useCallback, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

import { useOnValuesChange } from "@shared/data";

import { useWalletsFiltersContext } from "../search-and-filtering";
import { useWalletsSelection } from "./use-wallets-selection.ts";

import type { FC } from "react";
import type { Wallet } from "@entity/wallets";


interface KeepWalletSelectedProps {
	wallets: Wallet[];
}

const KeepWalletSelected: FC<KeepWalletSelectedProps> = ({ wallets }) => {
	const { search, caseSensitive, typeFilter, sortBy, sortDirection } = useWalletsFiltersContext();
	const { selectedWalletId, selectWallet } = useWalletsSelection(
		useShallow((state) => ({
			selectedWalletId: state.selectedWalletId,
			selectWallet: state.selectWallet,
		}))
	);

	const firstWalletId = wallets.at(0)?.id;

	const selectFirstWallet = useCallback(() => {
		if (firstWalletId) {
			selectWallet(firstWalletId);
		}
	}, [firstWalletId, selectWallet]);

	useOnValuesChange(
		[search, caseSensitive, typeFilter, sortBy, sortDirection],
		selectFirstWallet
	);

	useEffect(() => {
		const selectionAvailable = wallets.some((wallet) => wallet.id === selectedWalletId);

		if (!selectionAvailable) {
			selectFirstWallet();
		}
	}, [selectFirstWallet, selectedWalletId, wallets]);

	return null;
}

KeepWalletSelected.displayName = 'KeepWalletSelected';

export { KeepWalletSelected };
export type { KeepWalletSelectedProps };

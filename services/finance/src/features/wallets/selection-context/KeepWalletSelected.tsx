import { useCallback, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { useOnValuesChange } from "@shared/data";
import { useWalletsFiltersContext } from "../search-and-filtering";
import { useWalletsSelection } from "./use-wallets-selection.ts";

import type { FC } from "react";
import type { Wallet } from "@entity/wallets";


interface KeepWalletSelectedProps {
	wallets: Wallet[];
	loaded: boolean;
}

const KeepWalletSelected: FC<KeepWalletSelectedProps> = ({ wallets, loaded }) => {
	const { search, caseSensitive, typeFilter, sortBy, sortDirection } = useWalletsFiltersContext();
	const {
		selectedWalletId,
		selectionConfirmed,
		selectWallet,
		confirmSelection,
		clearSelection,
	} = useWalletsSelection(
		useShallow((state) => ({
			selectedWalletId: state.selectedWalletId,
			selectionConfirmed: state.selectionConfirmed,
			selectWallet: state.selectWallet,
			confirmSelection: state.confirmSelection,
			clearSelection: state.clearSelection,
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
		if (!loaded) return;

		const selectionAvailable = wallets.some((wallet) => {
			return wallet.id === selectedWalletId;
		});

		if (selectionAvailable) {
			if (!selectionConfirmed) confirmSelection();
		} else if (firstWalletId) {
			selectWallet(firstWalletId);
		} else if (!selectionConfirmed && selectedWalletId !== null) {
			clearSelection();
		}
	}, [
		loaded,
		wallets,
		selectedWalletId,
		selectionConfirmed,
		firstWalletId,
		selectWallet,
		confirmSelection,
		clearSelection,
	]);

	return null;
}

KeepWalletSelected.displayName = 'KeepWalletSelected';

export { KeepWalletSelected };
export type { KeepWalletSelectedProps };

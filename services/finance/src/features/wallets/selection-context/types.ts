interface WalletsSelection {
	selectedWalletId: string | null;
	selectionConfirmed: boolean;
}

interface WalletsSelectionState extends WalletsSelection {
	selectWallet: (walletId: string) => void;
	confirmSelection: () => void;
	clearSelection: () => void;
}

export type { WalletsSelection, WalletsSelectionState };

interface WalletsSelection {
	selectedWalletId: string | null;
}

interface WalletsSelectionState extends WalletsSelection {
	selectWallet: (walletId: string) => void;
}

export type { WalletsSelection, WalletsSelectionState };

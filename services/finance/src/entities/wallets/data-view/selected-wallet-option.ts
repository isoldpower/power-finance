import type { WalletSelectItem } from "../form-fields";


const selectedWalletOption = (
	options: WalletSelectItem[],
	walletId: string,
): WalletSelectItem | undefined => {
	return options.find((option) => {
		return option.id === walletId;
	});
};

export { selectedWalletOption };

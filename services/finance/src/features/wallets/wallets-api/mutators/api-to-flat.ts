import {WalletDetailed, WalletPreview} from "@feature/wallets/wallets-api/types.ts";
import {Wallet} from "@entity/wallets";

const walletPreviewResponseToFlat = (
	response: WalletPreview
): Wallet => {
	return response;
}

const walletDetailedResponseToFlat = (
	response: WalletDetailed
): Wallet => {
	const { meta, ...data } = response;

	return Object.assign({}, data, meta);
}

export { walletPreviewResponseToFlat, walletDetailedResponseToFlat };
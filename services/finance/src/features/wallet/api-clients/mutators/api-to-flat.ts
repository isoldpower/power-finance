import {WalletDetailed, WalletPreview} from "@feature/wallet/api-clients/types.ts";
import {Wallet} from "@entity/wallet";

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
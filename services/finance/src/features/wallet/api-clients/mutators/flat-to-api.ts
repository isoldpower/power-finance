import {Wallet} from "@entity/wallet";
import {WalletDetailed, WalletPreview} from "@feature/wallet/api-clients/types.ts";

const flatToWalletPreview = (
	flat: Wallet
): WalletPreview => {
	const { id, createdAt, updatedAt, ...data } = flat;

	return { ...data, id };
}

const flatToWalletDetailed = (
	flat: Wallet
): WalletDetailed => {
	const {id, createdAt, updatedAt, ...data} = flat;

	return {
		...data,
		id,
		meta: {
			createdAt: createdAt || '',
			updatedAt: updatedAt || '',
			id
		}
	};
}

export { flatToWalletPreview, flatToWalletDetailed };
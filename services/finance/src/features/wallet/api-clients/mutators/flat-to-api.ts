import { Wallet } from "@entity/wallet";
import type { WalletDetailed, WalletPreview } from "../types.ts";

const flatToWalletPreview = (
	flat: Wallet
): WalletPreview => {
	const { id, ...data } = flat;

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
			createdAt: createdAt ?? '',
			updatedAt: updatedAt ?? '',
			id
		}
	};
}

export { flatToWalletPreview, flatToWalletDetailed };
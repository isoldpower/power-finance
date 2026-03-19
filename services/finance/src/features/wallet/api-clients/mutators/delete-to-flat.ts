import { WalletDeleteResponse } from "../rest-client/types.ts";


interface WalletDeleteFlat {
	success: boolean
	id: string
	message: string
}

const walletDeletedToFlat = (
	response: WalletDeleteResponse
): WalletDeleteFlat => {
	return {
		success: response.meta.success,
		id: response.meta.id,
		message: response.message
	};
}

export { walletDeletedToFlat };
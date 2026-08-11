import { walletDeletedToFlat } from "../mutators/delete-to-flat.ts";
import type { IWalletsRESTApiClient } from "../rest-client";

interface DeleteWalletRequest {
	handler: Pick<IWalletsRESTApiClient, 'delete'>
	id: string
}

interface DeleteWalletResponse {
	message: string
	success: boolean
	id: string
}

async function deleteWallet(
	request: DeleteWalletRequest
): Promise<DeleteWalletResponse> {
	return request.handler.delete({ id: request.id })
		.then(walletDeletedToFlat);
}

export { deleteWallet };
export type { DeleteWalletRequest, DeleteWalletResponse };
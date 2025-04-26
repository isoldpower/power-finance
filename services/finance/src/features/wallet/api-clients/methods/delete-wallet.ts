import type { IWalletsRESTApiClient } from "../rest-client";

interface DeleteWalletRequest {
	handler: Pick<IWalletsRESTApiClient, 'delete'>
	id: string
}

interface DeleteWalletResponse {
	message: string
}

async function deleteWallet(
	request: DeleteWalletRequest
): Promise<DeleteWalletResponse> {
	return request.handler.delete({ id: request.id });
}

export { deleteWallet };
export type { DeleteWalletRequest, DeleteWalletResponse };
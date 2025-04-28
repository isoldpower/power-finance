import type { Wallet } from "@entity/wallet";
import type { IWalletsRESTApiClient } from "../rest-client";
import type { WalletPatchRequest } from "../rest-client/types.ts";

interface UpdateWalletRequest {
	handler: Pick<IWalletsRESTApiClient, 'patch'>
	payload: WalletPatchRequest
}

interface UpdateWalletResponse extends Wallet {
}

async function updateWallet(
	request: UpdateWalletRequest
): Promise<UpdateWalletResponse> {
	return request.handler.patch(request.payload);
}

export { updateWallet };
export type { UpdateWalletRequest, UpdateWalletResponse };
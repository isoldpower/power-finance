import type { Wallet } from "@entity/wallets";
import type { WalletPatchRequest, IWalletsRESTApiClient } from "../rest-client";

interface UpdateWalletRequest {
	handler: Pick<IWalletsRESTApiClient, 'patch'>
	payload: WalletPatchRequest
}

type UpdateWalletResponse = Wallet & object;

async function updateWallet(
	request: UpdateWalletRequest
): Promise<UpdateWalletResponse> {
	return request.handler.patch(request.payload);
}

export { updateWallet };
export type { UpdateWalletRequest, UpdateWalletResponse };
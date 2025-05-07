import type { Wallet } from "@entity/wallet";
import type { IWalletsRESTApiClient } from "../rest-client";
import type { WalletPostRequest } from "../rest-client/types.ts";

interface CreateWalletRequest {
	handler: Pick<IWalletsRESTApiClient, 'post'>
	payload: WalletPostRequest
}

type CreateWalletResponse = Wallet & object;

async function createWallet(
	request: CreateWalletRequest
): Promise<CreateWalletResponse> {
	return request.handler.post(request.payload);
}

export { createWallet };
export type { CreateWalletRequest, CreateWalletResponse };
import type { Wallet } from "@entity/wallet";
import type { IWalletsRESTApiClient } from "../rest-client";
import type { WalletPutRequest } from "../rest-client/types.ts";

interface ReplaceWalletRequest {
	handler: Pick<IWalletsRESTApiClient, 'put'>
	payload: WalletPutRequest
}

type ReplaceWalletResponse =  Wallet & object;

async function replaceWallet(
	request: ReplaceWalletRequest
): Promise<ReplaceWalletResponse> {
	return request.handler.put(request.payload);
}

export { replaceWallet };
export type { ReplaceWalletRequest, ReplaceWalletResponse };
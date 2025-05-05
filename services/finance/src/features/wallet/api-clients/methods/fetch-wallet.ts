import type { Wallet } from "@entity/wallet";
import type { IWalletsRESTApiClient } from "../rest-client";
import type { WalletGetRequest } from "../rest-client/types.ts";

interface FetchWalletRequest {
	handler: Pick<IWalletsRESTApiClient, 'get'>
	payload: WalletGetRequest
}

interface FetchWalletResponse extends Wallet {
}

async function fetchWallet(
	request: FetchWalletRequest
): Promise<FetchWalletResponse> {
	return request.handler.get(request.payload);
}

export { fetchWallet };
export type { FetchWalletRequest, FetchWalletResponse };
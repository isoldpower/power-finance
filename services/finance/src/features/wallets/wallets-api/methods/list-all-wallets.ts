import type { Wallet } from "@entity/wallets";
import type { IWalletsRESTApiClient } from "../rest-client/types.ts";


interface ListAllWalletsRequest {
	handler: Pick<IWalletsRESTApiClient, 'list'>;
}

interface ListAllWalletsResponse {
	data: Wallet[];
	meta: {
		limit: number
		offset: number
		total: number
	}
}

async function listAllWallets(
	request: ListAllWalletsRequest
): Promise<ListAllWalletsResponse> {
	return request.handler.list({
		params: {}
	})
}

export { listAllWallets };
export type { ListAllWalletsRequest, ListAllWalletsResponse };
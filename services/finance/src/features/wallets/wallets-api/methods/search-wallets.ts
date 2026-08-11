import type {
	IWalletsRESTApiClient,
	WalletsSearchRequest,
} from "../rest-client";
import type { Wallet } from "@entity/wallets";


interface SearchWalletsRequest {
	handler: Pick<IWalletsRESTApiClient, 'search'>;
	payload: WalletsSearchRequest;
}

interface SearchWalletsResponse {
	data: Wallet[];
	meta: {
		limit: number
		offset: number
		total: number
	}
}

async function searchWallets(
	request: SearchWalletsRequest
): Promise<SearchWalletsResponse> {
	return request.handler.search(request.payload);
}

export { searchWallets };
export type { SearchWalletsRequest, SearchWalletsResponse };
import { pageFromMeta } from "@shared/api";
import { walletFromApi, walletQueryToApi } from "../mutators";
import type { Page, PageParams, SearchOrder } from "@shared/api";
import type { Wallet, WalletQuery } from "@entity/wallets";
import type { IWalletsRESTApiClient } from "../rest-client";

interface SearchWalletsRequest {
	handler: Pick<IWalletsRESTApiClient, 'search'>;
	query: WalletQuery;
	order?: SearchOrder;
	page?: PageParams;
}

interface SearchWalletsResponse {
	page: Page<Wallet>;
}

async function searchWallets(request: SearchWalletsRequest): Promise<SearchWalletsResponse> {
	const response = await request.handler.search({
		data: walletQueryToApi(request.query),
		params: { ...request.page, order: request.order },
	});

	return { page: pageFromMeta(response.data.map(walletFromApi), response.meta) };
}

export { searchWallets };
export type { SearchWalletsRequest, SearchWalletsResponse };

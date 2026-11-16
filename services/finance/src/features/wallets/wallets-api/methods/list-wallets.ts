import { pageFromMeta } from "@internal/shared";
import type { Page, PageParams } from "@internal/shared";
import { walletFromApi } from "../mutators";

import type { Wallet } from "@entity/wallets";
import type { IWalletsRESTApiClient } from "../rest-client";


interface ListWalletsRequest {
	handler: Pick<IWalletsRESTApiClient, 'list'>;
	page?: PageParams;
}

interface ListWalletsResponse {
	page: Page<Wallet>;
}

async function listWallets(request: ListWalletsRequest): Promise<ListWalletsResponse> {
	const response = await request.handler.list({ params: request.page });

	return { page: pageFromMeta(response.data.map(walletFromApi), response.meta) };
}

export { listWallets };
export type { ListWalletsRequest, ListWalletsResponse };

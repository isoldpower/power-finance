import { pageFromMeta } from "@shared/api";
import { transactionFromApi } from "@feature/transactions/transactions-api";
import { walletDetailsFromApi } from "../mutators";

import type { Page, PageParams } from "@shared/api";
import type { Transaction } from "@entity/transactions";
import type { WalletDetails } from "@entity/wallets";
import type { IWalletsRESTApiClient } from "../rest-client";
import type { WalletPeriodDto } from "../types.ts";


interface FetchWalletRequest {
	handler: Pick<IWalletsRESTApiClient, 'get'>;
	id: string;
	period?: WalletPeriodDto;
	page?: PageParams;
}

interface FetchWalletResponse {
	wallet: WalletDetails;
	recent: Page<Transaction>;
	period: WalletPeriodDto;
}

async function fetchWallet(request: FetchWalletRequest): Promise<FetchWalletResponse> {
	const response = await request.handler.get({
		id: request.id,
		params: { ...request.page, period: request.period },
	});

	return {
		wallet: walletDetailsFromApi(response.data),
		recent: pageFromMeta(response.data.recent.map(transactionFromApi), response.meta.recent),
		period: response.meta.period,
	};
}

export { fetchWallet };
export type { FetchWalletRequest, FetchWalletResponse };

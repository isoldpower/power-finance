import { walletDraftToApi, walletFromApi } from "../mutators";

import type { Wallet, WalletDraft } from "@entity/wallets";
import type { IWalletsRESTApiClient } from "../rest-client";


interface CreateWalletRequest {
	handler: Pick<IWalletsRESTApiClient, 'post'>;
	draft: WalletDraft;
	idempotencyKey?: string;
}

interface CreateWalletResponse {
	wallet: Wallet;
	replayed: boolean;
}

async function createWallet(request: CreateWalletRequest): Promise<CreateWalletResponse> {
	const response = await request.handler.post({
		data: walletDraftToApi(request.draft),
		idempotencyKey: request.idempotencyKey,
	});

	return {
		wallet: walletFromApi(response.data),
		replayed: response.meta.idempotent_replay ?? false,
	};
}

export { createWallet };
export type { CreateWalletRequest, CreateWalletResponse };

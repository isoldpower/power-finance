import { walletFromApi, walletPatchToApi } from "../mutators";
import type { Wallet, WalletPatch } from "@entity/wallets";
import type { IWalletsRESTApiClient } from "../rest-client";

interface UpdateWalletRequest {
	handler: Pick<IWalletsRESTApiClient, 'patch'>;
	id: string;
	patch: WalletPatch;
}

type UpdateWalletResponse = Wallet;

async function updateWallet(request: UpdateWalletRequest): Promise<UpdateWalletResponse> {
	const response = await request.handler.patch({
		id: request.id,
		data: walletPatchToApi(request.patch),
	});

	return walletFromApi(response.data);
}

export { updateWallet };
export type { UpdateWalletRequest, UpdateWalletResponse };

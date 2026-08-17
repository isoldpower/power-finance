import { walletFromApi } from "../mutators";
import type { Wallet } from "@entity/wallets";
import type { IWalletsRESTApiClient } from "../rest-client";

interface DeleteWalletRequest {
	handler: Pick<IWalletsRESTApiClient, 'delete'>;
	id: string;
}

type DeleteWalletResponse = Wallet;

async function deleteWallet(request: DeleteWalletRequest): Promise<DeleteWalletResponse> {
	const response = await request.handler.delete({ id: request.id });

	return walletFromApi(response.data);
}

export { deleteWallet };
export type { DeleteWalletRequest, DeleteWalletResponse };

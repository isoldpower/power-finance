import type { IWalletsRESTApiClient } from "../rest-client/types.ts";
import type { WalletKindDto } from "../types.ts";


interface ListKindsRequest {
	handler: Pick<IWalletsRESTApiClient, 'listKinds'>;
}

interface ListKindsResponse {
	data: WalletKindDto[];
}

async function listKinds(request: ListKindsRequest): Promise<ListKindsResponse> {
	return request.handler.listKinds({ params: {} });
}

export { listKinds };
export type { ListKindsRequest, ListKindsResponse };

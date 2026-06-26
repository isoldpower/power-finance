import type { ISummaryRESTApiClient, LedgerBalance } from "../types.ts";

interface GetLedgerBalanceRequest {
	handler: Pick<ISummaryRESTApiClient, 'getLedgerBalance'>;
}

type GetLedgerBalanceResponse = LedgerBalance;

async function getLedgerBalance(request: GetLedgerBalanceRequest): Promise<GetLedgerBalanceResponse> {
	return request.handler.getLedgerBalance({ params: {} });
}

export { getLedgerBalance };
export type { GetLedgerBalanceRequest, GetLedgerBalanceResponse };

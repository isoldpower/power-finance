import type { ITransactionsRESTApiClient } from "../rest-client/types.ts";
import type { ReceiptScanDto } from "../types.ts";


interface ScanReceiptRequest {
	handler: Pick<ITransactionsRESTApiClient, 'scanReceipt'>;
	receiptId?: string;
}

type ScanReceiptResponse = ReceiptScanDto;

async function scanReceipt(request: ScanReceiptRequest): Promise<ScanReceiptResponse> {
	return request.handler.scanReceipt({ params: { receiptId: request.receiptId } });
}

export { scanReceipt };
export type { ScanReceiptRequest, ScanReceiptResponse };

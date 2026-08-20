import { receiptScanFromApi } from "../mutators";

import type { ReceiptScan } from "@entity/transactions";
import type { ITransactionsRESTApiClient } from "../rest-client";


interface ScanReceiptRequest {
	handler: Pick<ITransactionsRESTApiClient, 'scanReceipt'>;
	receiptId?: string;
}

type ScanReceiptResponse = ReceiptScan;

async function scanReceipt(request: ScanReceiptRequest): Promise<ScanReceiptResponse> {
	const response = await request.handler.scanReceipt({ 
		params: { receiptId: request.receiptId },
	});

	return receiptScanFromApi(response.data);
}

export { scanReceipt };
export type { ScanReceiptRequest, ScanReceiptResponse };

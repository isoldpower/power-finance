import { IN_TEMPORARY_ID, OUT_TEMPORARY_ID } from "./constants";

import type { TransactionChainEntryDraft } from "@entity/transactions";


interface TransferLeg {
	walletId: string;
	currency: string;
	amount: number;
}

function buildTransferChain(
	name: string,
	category: string | null,
	sent: TransferLeg,
	received: TransferLeg
): TransactionChainEntryDraft[] {
	return [
		{
			temporaryId: OUT_TEMPORARY_ID,
			after: null,
			name,
			currency: sent.currency,
			amount: Math.abs(sent.amount),
			walletId: sent.walletId,
			origin: 'manual',
			type: 'expense',
			category,
			evidence: null,
		},
		{
			temporaryId: IN_TEMPORARY_ID,
			after: OUT_TEMPORARY_ID,
			name,
			currency: received.currency,
			amount: Math.abs(received.amount),
			walletId: received.walletId,
			origin: 'manual',
			type: 'income',
			category,
			evidence: null,
		},
	];
}

export { buildTransferChain };
export type { TransferLeg };

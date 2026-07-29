import type { TransactionChainItem } from "../transactions-api";
import { IN_TEMPORARY_ID, OUT_TEMPORARY_ID } from "./constants";


function buildTransferChain(
	fromId: string,
	toId: string,
	sentAmount: number,
	receivedAmount: number = sentAmount
): TransactionChainItem[] {
	const sent = Math.abs(sentAmount).toFixed(2);
	const received = Math.abs(receivedAmount).toFixed(2);

	return [
		{
			temporary_id: OUT_TEMPORARY_ID,
			after: null,
			source_wallet_id: fromId,
			amount: `-${sent}`,
		},
		{
			temporary_id: IN_TEMPORARY_ID,
			after: OUT_TEMPORARY_ID,
			source_wallet_id: toId,
			amount: received,
		},
	];
}

export { buildTransferChain };

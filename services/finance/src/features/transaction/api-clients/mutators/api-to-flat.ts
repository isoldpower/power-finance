import type { TransactionDetailed, TransactionPreview } from "../types.ts";
import type { TransactionDto, TransactionPreviewDto } from "@entity/transaction";


const parseWallet = (wallet: TransactionDetailed['source_wallet']) => ({
	...wallet,
	balance: {
		...wallet.balance,
		amount: parseFloat(wallet.balance.amount as unknown as string),
	},
});

const transactionPreviewResponseToFlat = (
	response: TransactionPreview
): TransactionPreviewDto => {
	return {
		id: response.id,
		amount: response.amount,
		currency_code: response.currency_code,
		source_wallet_id: response.source_wallet_id,
		created_at: response.created_at,
	};
}

const transactionDetailedResponseToFlat = (
	response: TransactionDetailed
): TransactionDto => {
	return {
		id: response.id,
		amount: response.amount,
		currency_code: response.currency_code,
		source_wallet: parseWallet(response.source_wallet),
		created_at: response.created_at,
	};
}

export { transactionPreviewResponseToFlat, transactionDetailedResponseToFlat };

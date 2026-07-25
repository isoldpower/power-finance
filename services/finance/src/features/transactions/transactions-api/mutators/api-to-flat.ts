import type { TransactionDetailed, TransactionPreview } from "../types.ts";
import type { TransactionDto, TransactionPreviewDto } from "@entity/transactions";


const parseWallet = (wallet: TransactionDetailed['wallet']) => ({
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
		source_wallet: {
			id: response.wallet.id,
			name: response.wallet.name,
			balance: {
				...response.wallet.balance,
				amount: parseFloat(response.wallet.balance.amount as unknown as string),
			},
			credit: false,
		},
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
		source_wallet: parseWallet(response.wallet),
		created_at: response.created_at,
	};
}

export { transactionPreviewResponseToFlat, transactionDetailedResponseToFlat };

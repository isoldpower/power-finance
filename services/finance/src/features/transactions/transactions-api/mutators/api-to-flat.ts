import type { TransactionDetailed, TransactionPreview, TransactionPreviewWallet } from "../types.ts";
import type { TransactionDto, TransactionPreviewDto, TransactionWalletRef } from "@entity/transactions";


const toWalletRef = (wallet: TransactionPreviewWallet): TransactionWalletRef => ({
	id: wallet.id,
	name: wallet.name,
	color: wallet.color,
});

const transactionPreviewResponseToFlat = (
	response: TransactionPreview
): TransactionPreviewDto => {
	return {
		id: response.id,
		amount: response.amount,
		currency_code: response.currency_code,
		direction: response.direction,
		merchant: response.merchant,
		category: response.category,
		occurred_at: response.occurred_at,
		created_at: response.created_at,
		origin: response.origin,
		entries: response.entries,
		source_wallet: toWalletRef(response.wallet),
	};
}

const transactionDetailedResponseToFlat = (
	response: TransactionDetailed
): TransactionDto => {
	return {
		id: response.id,
		amount: response.amount,
		currency_code: response.currency_code,
		direction: response.direction,
		merchant: response.merchant,
		category: response.category,
		occurred_at: response.occurred_at,
		created_at: response.meta.created_at,
		origin: response.origin,
		entries: response.entries,
		note: response.note,
		receipt: response.receipt,
		source_wallet: { id: response.wallet.id, name: response.wallet.name, color: response.wallet.color },
		counterparty_wallet: response.counterparty_wallet && toWalletRef(response.counterparty_wallet),
	};
}

export { transactionPreviewResponseToFlat, transactionDetailedResponseToFlat };

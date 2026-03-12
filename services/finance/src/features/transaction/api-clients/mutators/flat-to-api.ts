import type { TransactionDto, TransactionPreviewDto } from "@entity/transaction";
import { TransactionPreview, TransactionDetailed } from "../types.ts";


const flatToTransactionPreview = (
	flat: TransactionPreviewDto
): TransactionPreview => {
	const { type, ...data } = flat;

	return {
		type,
		description: data.description,
		sender: data.sender ? {
			wallet_id: data.sender.wallet_id,
			amount: data.sender.amount
		} : undefined,
		receiver: data.receiver ? {
			wallet_id: data.receiver.wallet_id,
			amount: data.receiver.amount
		} : undefined,
		id: data.id,
		meta: {
			id: data.id,
			created_at: flat.createdAt
		}
	};
}

const flatPreviewToTransactionPreview = (
	flat: TransactionDto
): TransactionPreview => {
	return flatToTransactionPreview({
		...flat,
		sender: flat.sender ? {
			wallet_id: flat.sender.wallet.id,
			amount: flat.sender.amount
		} : undefined,
		receiver: flat.receiver ? {
			wallet_id: flat.receiver.wallet.id,
			amount: flat.receiver.amount
		} : undefined
	} as TransactionPreviewDto);
}
	
const flatToTransactionDetailed = (
	flat: TransactionDto
): TransactionDetailed => {
	const { type, ...data } = flat;

	return {
		type,
		id: data.id,
		description: data.description,
		sender: data.sender ? {
			wallet: data.sender.wallet,
			amount: data.sender.amount
		} : undefined,
		receiver: data.receiver ? {
			wallet: data.receiver.wallet,
			amount: data.receiver.amount
		} : undefined,
		meta: {
			id: data.id,
			created_at: data.createdAt
		}
	};
}

export { flatToTransactionPreview, flatToTransactionDetailed, flatPreviewToTransactionPreview };
import type { Transaction } from "src/entities/transaction";
import type { TransactionPreview, TransactionDetailed } from "../types.ts";


const flatToTransactionPreview = (
	flat: Transaction
): TransactionPreview => {
	const { type, ...data } = flat;

	return {
		type,
		id: data.id,
		data,
		meta: {
			id: data.id,
			createdAt: flat.createdAt
		}
	};
}

const flatToTransactionDetailed = (
	flat: Transaction
): TransactionDetailed => {
	const { type, ...data } = flat;

	return {
		type,
		id: data.id,
		data,
		meta: {
			id: data.id,
			createdAt: data.createdAt
		}
	};
}

export { flatToTransactionPreview, flatToTransactionDetailed };
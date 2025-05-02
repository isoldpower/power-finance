import type { Transaction } from "src/entities/transaction";
import type { TransactionPreview, TransactionDetailed } from "../types.ts";


const flatToTransactionPreview = (
	flat: Transaction
): TransactionPreview => {
	const { type, id, ...data } = flat;

	return {
		type,
		id,
		data,
		meta: {
			id,
			createdAt: flat.createdAt
		}
	};
}

const flatToTransactionDetailed = (
	flat: Transaction
): TransactionDetailed => {
	const { type, createdAt, id, ...data } = flat;

	return {
		type,
		id,
		data,
		meta: { id, createdAt }
	};
}

export { flatToTransactionPreview, flatToTransactionDetailed };
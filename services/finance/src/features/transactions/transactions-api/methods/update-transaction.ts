import { transactionFromApi, transactionPatchToApi } from "../mutators";
import type { Transaction, TransactionPatch } from "@entity/transactions";
import type { ITransactionsRESTApiClient } from "../rest-client";

interface UpdateTransactionRequest {
	handler: Pick<ITransactionsRESTApiClient, 'patch'>;
	id: string;
	patch: TransactionPatch;
}

type UpdateTransactionResponse = Transaction;

async function updateTransaction(request: UpdateTransactionRequest): Promise<UpdateTransactionResponse> {
	const response = await request.handler.patch({
		id: request.id,
		data: transactionPatchToApi(request.patch),
	});

	return transactionFromApi(response.data);
}

export { updateTransaction };
export type { UpdateTransactionRequest, UpdateTransactionResponse };

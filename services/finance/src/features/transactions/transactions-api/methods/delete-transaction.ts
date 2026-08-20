import { transactionFromApi } from "../mutators";

import type { Transaction } from "@entity/transactions";
import type { ITransactionsRESTApiClient } from "../rest-client";


interface DeleteTransactionRequest {
	handler: Pick<ITransactionsRESTApiClient, 'delete'>;
	id: string;
}

type DeleteTransactionResponse = Transaction;

async function deleteTransaction(request: DeleteTransactionRequest): Promise<DeleteTransactionResponse> {
	const response = await request.handler.delete({ id: request.id });

	return transactionFromApi(response.data);
}

export { deleteTransaction };
export type { DeleteTransactionRequest, DeleteTransactionResponse };

import type { ITransactionsRESTApiClient } from "../rest-client";

interface DeleteTransactionRequest {
	handler: Pick<ITransactionsRESTApiClient, 'delete'>
	id: string
}

interface DeleteTransactionResponse {
	message: string
}

async function deleteTransaction(
	request: DeleteTransactionRequest
): Promise<DeleteTransactionResponse> {
	return request.handler.delete({ id: request.id });
}

export { deleteTransaction };
export type { DeleteTransactionRequest, DeleteTransactionResponse };
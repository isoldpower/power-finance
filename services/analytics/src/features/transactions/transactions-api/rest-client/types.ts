import type { ApiEnvelope } from "@internal/shared";
import type {
	CounterpartiesMetaDto,
	CounterpartiesParamsDto,
	CounterpartyDto,
	TransactionBriefDto,
	TransactionsMetaDto,
	TransactionsParamsDto,
} from "../types.ts";


interface CounterpartiesRequest {
	params: CounterpartiesParamsDto;
}

type CounterpartiesResponse = ApiEnvelope<CounterpartyDto[], CounterpartiesMetaDto>;

interface TransactionsRequest {
	params: TransactionsParamsDto;
}

type TransactionsResponse = ApiEnvelope<TransactionBriefDto[], TransactionsMetaDto>;

interface ITransactionsRESTApiClient {
	getCounterparties: (request: CounterpartiesRequest) => Promise<CounterpartiesResponse>;
	getTransactions: (request: TransactionsRequest) => Promise<TransactionsResponse>;
}

export type {
	CounterpartiesRequest,
	CounterpartiesResponse,
	ITransactionsRESTApiClient,
	TransactionsRequest,
	TransactionsResponse,
};

import { matchesTransactionQuery } from "../../filtration";
import { CACHE_KEYS } from "../config.ts";

import type { QueryKey } from "@tanstack/react-query";
import type { OptimisticResource } from "@shared/data";
import type { TransactionDetails, TransactionQuery } from "@entity/transactions";
import type { Transaction } from "@entity/transactions";
import type { FetchTransactionResponse } from "../../transactions-api";


const MATCH_ALL: TransactionQuery = {};

const searchQueryOf = (key: QueryKey): TransactionQuery => {
	const [, query] = key;

	return typeof query === 'object' && query !== null ? query as TransactionQuery : MATCH_ALL;
};

const readDetail = (response: FetchTransactionResponse): TransactionDetails => response.transaction;

const writeDetail = (
	response: FetchTransactionResponse,
	transaction: TransactionDetails,
): FetchTransactionResponse => ({ ...response, transaction });

const TRANSACTION_RESOURCE: OptimisticResource<
	Transaction,
	TransactionDetails,
	FetchTransactionResponse
> = {
	paged: [
		{ key: CACHE_KEYS.list },
		{
			key: CACHE_KEYS.search,
			accepts: (key, transaction) => matchesTransactionQuery(transaction, searchQueryOf(key)),
		},
	],
	details: [
		{ key: CACHE_KEYS.fetch, read: readDetail, write: writeDetail },
		{ key: CACHE_KEYS.ledger, read: readDetail, write: writeDetail },
	],
};

export { TRANSACTION_RESOURCE };

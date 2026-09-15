import type { CachesSnapshot, PagedResponse } from "@shared/data";
import type { Transaction } from "@entity/transactions";
import type { FetchTransactionResponse } from "../../transactions-api";


type TransactionPageResponse = PagedResponse<Transaction>;

type TransactionCachesSnapshot = CachesSnapshot<Transaction, FetchTransactionResponse>;

export type { TransactionCachesSnapshot, TransactionPageResponse };

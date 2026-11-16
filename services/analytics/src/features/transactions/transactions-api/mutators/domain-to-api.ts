import { categoryToApi } from "@feature/filters/ledger-api";

import type { TransactionsFilter } from "@entity/transactions";
import type { TransactionsParamsDto } from "../types.ts";


type TransactionsFilterParams = Pick<TransactionsParamsDto, 'type' | 'category' | 'name'>;

const transactionsFilterToApi = (filter: TransactionsFilter): TransactionsFilterParams => ({
	type: filter.side,
	category: filter.categoryIds?.map(categoryToApi),
	name: filter.name,
});

export { transactionsFilterToApi };

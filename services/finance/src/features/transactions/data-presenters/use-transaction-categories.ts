import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

import { listCategories } from "../transactions-api";
import { useApiContext } from "@app/api";
import { CACHE_KEYS } from "./config.ts";
import type { TransactionCategory } from "@entity/transactions";
import type { ListCategoriesResponse } from "../transactions-api";


type UseTransactionCategoriesOptions = Omit<
	UseQueryOptions<ListCategoriesResponse>,
	'queryKey' | 'queryFn'
>;

type UseTransactionCategoriesReturn = UseQueryResult & {
	categories: TransactionCategory[];
};

const useTransactionCategories = (
	options?: UseTransactionCategoriesOptions
): UseTransactionCategoriesReturn => {
	const apiContext = useApiContext();
	const query = useQuery<ListCategoriesResponse>({
		queryKey: [CACHE_KEYS.categories],
		queryFn: () => listCategories({
			handler: apiContext.transactionServers.rest
		}),
		...options ?? {}
	});

	const categories = useMemo(() => query.data?.categories ?? [], [query.data]);

	return { ...query, categories };
};

export { useTransactionCategories };
export type { UseTransactionCategoriesOptions, UseTransactionCategoriesReturn };

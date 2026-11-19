import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useApiContext } from "@app/api";
import { listCategories } from "../categories-api";
import { CATEGORIES_CACHE_KEYS } from "./cache-config.ts";
import { ANY_KIND } from "./optimistic";
import { orderCategories } from "./categories-partials/order-categories.ts";

import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import type { Category, CategoryKind } from "@entity/categories";
import type { ListCategoriesResponse } from "../categories-api";


type UseCategoriesOptions = Omit<UseQueryOptions<ListCategoriesResponse>, 'queryKey' | 'queryFn'>;

type UseCategoriesReturn = UseQueryResult<ListCategoriesResponse> & {
	categories: Category[];
};

const FIRST_CURSOR = 'first';

const useCategories = (
	kind?: CategoryKind,
	options?: UseCategoriesOptions
): UseCategoriesReturn => {
	const apiContext = useApiContext();
	const query = useQuery<ListCategoriesResponse>({
		queryKey: [CATEGORIES_CACHE_KEYS.list, kind ?? ANY_KIND, FIRST_CURSOR],
		queryFn: () => listCategories({
			handler: apiContext.categoryServers.rest,
			kind,
		}),
		...options ?? {},
	});

	const categories = useMemo(() => {
		return orderCategories(query.data?.page.items ?? []);
	}, [query.data]);

	return useMemo(() => ({ 
		...query,
		categories
	}), [query, categories]);
};

export { useCategories };
export type { UseCategoriesOptions, UseCategoriesReturn };

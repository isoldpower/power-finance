import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import type { QueryKey, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";


interface ResourceQueryConfig<TResponse, TValue> {
	key: QueryKey;
	fetch: () => Promise<TResponse>;
	select: (response: TResponse) => TValue;
	fallback: TValue;
	options?: Omit<UseQueryOptions<TResponse>, 'queryKey' | 'queryFn'>;
}

type UseResourceQueryResult<TResponse, TValue> = UseQueryResult<TResponse> & {
	value: TValue;
};

const useResourceQuery = <TResponse, TValue>(
	config: ResourceQueryConfig<TResponse, TValue>
): UseResourceQueryResult<TResponse, TValue> => {
	const { key, fetch, select, fallback, options } = config;

	const query = useQuery<TResponse>({
		queryKey: key,
		queryFn: fetch,
		...options ?? {},
	});

	return useMemo(() => ({
		...query,
		value: query.data === undefined ? fallback : select(query.data),
	}), [query]);
};

export { useResourceQuery };
export type { ResourceQueryConfig, UseResourceQueryResult };

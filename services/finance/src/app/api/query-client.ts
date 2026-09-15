import { QueryClient } from "@tanstack/react-query";

import { retryDelay, retryQuery } from "./retry-policy.ts";
import { staleRefetchInterval } from "./stale-refetch.ts";


function createQueryClient(): QueryClient {
	return new QueryClient({
		defaultOptions: {
			queries: {
				retry: retryQuery,
				retryDelay,
				refetchInterval: (query) => staleRefetchInterval(
					query.state.error,
					query.state.errorUpdateCount,
				),
			},
			mutations: {
				retry: false,
			},
		},
	});
}

export { createQueryClient };

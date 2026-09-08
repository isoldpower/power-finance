import { QueryClient } from "@tanstack/react-query";

import { retryDelay, retryQuery } from "./retry-policy.ts";


function createQueryClient(): QueryClient {
	return new QueryClient({
		defaultOptions: {
			queries: {
				retry: retryQuery,
				retryDelay,
			},
			mutations: {
				retry: false,
			},
		},
	});
}

export { createQueryClient };

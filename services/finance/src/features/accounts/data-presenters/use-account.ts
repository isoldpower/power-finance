import { useQuery } from "@tanstack/react-query";
import type { UseQueryResult } from "@tanstack/react-query";

import { useApiContext } from "@app/api";
import { fetchAccount } from "../accounts-api";
import { ACCOUNTS_CACHE_KEYS } from "./cache-config.ts";
import type { FetchAccountResponse } from "../accounts-api";


type UseAccountReturn = UseQueryResult<FetchAccountResponse>;

const useAccount = (
	accountId: string
): UseAccountReturn => {
	const apiContext = useApiContext();

	return useQuery<FetchAccountResponse>({
		queryKey: [ACCOUNTS_CACHE_KEYS.fetch, accountId],
		queryFn: () => fetchAccount({
			handler: apiContext.accountServers.rest,
			payload: { id: accountId },
		}),
		enabled: accountId !== '',
	});
};

export { useAccount };
export type { UseAccountReturn };

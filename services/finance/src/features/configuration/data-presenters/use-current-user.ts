import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useApiContext } from "@app/api";
import { getSession } from "../auth-api";
import { CACHE_KEYS } from "./cache-config.ts";

import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import type { UserProfile } from "@entity/configuration";
import type { GetSessionResponse } from "../auth-api";


type UseCurrentUserOptions = Omit<UseQueryOptions<GetSessionResponse>, 'queryKey' | 'queryFn'>;

type UseCurrentUserReturn = UseQueryResult<GetSessionResponse> & {
	profile: UserProfile | null;
	isAuthenticated: boolean;
};

const useCurrentUser = (options?: UseCurrentUserOptions): UseCurrentUserReturn => {
	const apiContext = useApiContext();
	const sessionQuery = useQuery<GetSessionResponse>({
		queryKey: [CACHE_KEYS.session, apiContext.authServers.revision],
		queryFn: () => getSession({ 
			handler: apiContext.authServers.rest,
		}),
		...options ?? {},
	});

	return useMemo(() => ({
		...sessionQuery,
		profile: sessionQuery.data?.profile ?? null,
		isAuthenticated: sessionQuery.data?.authenticated ?? false,
	}), [sessionQuery]);
};

export { useCurrentUser };
export type { UseCurrentUserOptions, UseCurrentUserReturn };

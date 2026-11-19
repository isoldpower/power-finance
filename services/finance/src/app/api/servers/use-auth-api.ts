import { useMemo } from "react";
import { clerk } from "@internal/shared";

import { AuthClerkRESTApiClient } from "@internal/shared";
import type { IAuthRESTApiClient } from "@internal/shared";


const LOADING_REVISION = 'loading';
const ANONYMOUS_REVISION = 'anonymous';

interface UseAuthApiResponse {
	rest: IAuthRESTApiClient;
	revision: string;
}

function useAuthApi(): UseAuthApiResponse {
	const { isLoaded, user } = clerk.useUser();

	const restAuthClient = useMemo<IAuthRESTApiClient>(() => {
		return new AuthClerkRESTApiClient(() => user ?? null);
	}, [user]);

	const revision = useMemo(() => {
		if (!isLoaded) return LOADING_REVISION;
		if (!user) return ANONYMOUS_REVISION;

		return `${user.id}:${(user.updatedAt?.getTime() ?? 0).toString()}`;
	}, [isLoaded, user]);

	return useMemo(() => ({
		rest: restAuthClient,
		revision,
	}), [restAuthClient, revision]);
}

export { useAuthApi, ANONYMOUS_REVISION, LOADING_REVISION };
export type { UseAuthApiResponse };

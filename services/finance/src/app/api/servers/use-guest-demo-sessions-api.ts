import { useMemo } from "react";
import { useAxiosInstance } from "@internal/shared";

import { GuestDemoSessionsHttpRESTApiClient, GuestDemoSessionsMockRESTApiClient } from "@feature/accounts";
import { API_BASE_PATH } from "../config.ts";

import type { IGuestDemoSessionsRESTApiClient } from "@feature/accounts";
import type { ApiServerOptions } from "./types.ts";


const GUEST_DEMO_SESSIONS_PATH = '/demo/sessions';

const withoutToken = (): Promise<null> => Promise.resolve(null);

type UseGuestDemoSessionsApiOptions = Pick<ApiServerOptions, 'baseUrl' | 'mode' | 'sandbox' | 'demoSession'>;

function useGuestDemoSessionsApi(options: UseGuestDemoSessionsApiOptions): IGuestDemoSessionsRESTApiClient {
	const axiosInstance = useAxiosInstance({
		baseUrl: `${options.baseUrl}${API_BASE_PATH}${GUEST_DEMO_SESSIONS_PATH}`,
		getToken: withoutToken,
		sandbox: options.sandbox,
		demoSession: options.demoSession,
	});

	return useMemo<IGuestDemoSessionsRESTApiClient>(() => {
		return options.mode === 'live'
			? new GuestDemoSessionsHttpRESTApiClient(axiosInstance)
			: new GuestDemoSessionsMockRESTApiClient();
	}, [axiosInstance, options.mode]);
}

export { useGuestDemoSessionsApi };
export type { UseGuestDemoSessionsApiOptions };

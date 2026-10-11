import { useMemo } from "react";
import { clerk } from "@internal/shared";
import { GUEST_DEMO_SESSIONS_PATH } from "./config.ts";
import { obtainGuestDemoToken } from "./guest-demo-token.ts";
import { API_BASE_PATH } from "../config.ts";

import type { ApiServerOptions } from "../servers/types.ts";


type ApiTokenGetter = () => Promise<string | null>;

function useApiTokenGetter(options: Pick<ApiServerOptions, 'baseUrl' | 'demoSession'>): ApiTokenGetter {
	const { getToken } = clerk.useAuth();
	const { baseUrl, demoSession } = options;

	return useMemo<ApiTokenGetter>(() => {
		if (demoSession === undefined || demoSession === '') {
			return () => getToken();
		}

		const sessionsUrl = `${baseUrl}${API_BASE_PATH}${GUEST_DEMO_SESSIONS_PATH}`;

		return () => obtainGuestDemoToken(
			sessionsUrl,
			demoSession
		);
	}, [baseUrl, demoSession, getToken]);
}

export { useApiTokenGetter };
export type { ApiTokenGetter };

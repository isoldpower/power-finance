import { useCallback, useMemo, useState } from "react";

import { useAxiosInstance } from "../../api/index.ts";
import { useDemoSession } from "../../demo-session/provider/index.ts";
import {
	API_V1_PATH,
	GUEST_DEMO_SESSIONS_PATH,
	GuestDemoReadinessHttpRESTApiClient,
	GuestDemoReadinessMockRESTApiClient,
	GuestDemoSessionsHttpRESTApiClient,
	GuestDemoSessionsMockRESTApiClient,
} from "../api/index.ts";
import { createGuestDemoSessionStore } from "./session-store.ts";
import { GuestDemoReactContext } from "./context.ts";

import type { FC, ReactNode } from "react";
import type { GuestDemoApiMode } from "../types.ts";
import type { GuestDemoContextValue } from "./types.ts";


interface GuestDemoSessionProviderProps {
	baseUrl: string;
	mode: GuestDemoApiMode;
	sandbox?: string;
	children: ReactNode;
}

const withoutToken = (): Promise<null> => Promise.resolve(null);

const GuestDemoSessionProvider: FC<GuestDemoSessionProviderProps> = ({
	baseUrl,
	mode,
	sandbox,
	children,
}) => {
	const demoSession = useDemoSession();
	const sessionsAxios = useAxiosInstance({
		baseUrl: `${baseUrl}${API_V1_PATH}${GUEST_DEMO_SESSIONS_PATH}`,
		getToken: withoutToken,
		sandbox,
		demoSession,
	});
	const [store] = useState(() => createGuestDemoSessionStore({
		demoSession: mode === 'live' ? demoSession ?? null : null,
		client: mode === 'live'
			? new GuestDemoSessionsHttpRESTApiClient(sessionsAxios)
			: new GuestDemoSessionsMockRESTApiClient(),
	}));
	const getGuestToken = useCallback(async () => (await store.getState().obtainSession()).token, [store]);
	const readinessAxios = useAxiosInstance({
		baseUrl: `${baseUrl}${API_V1_PATH}`,
		getToken: getGuestToken,
		sandbox,
		demoSession,
	});

	const contextValue = useMemo<GuestDemoContextValue>(() => ({
		store,
		readiness: mode === 'live'
			? new GuestDemoReadinessHttpRESTApiClient(readinessAxios)
			: new GuestDemoReadinessMockRESTApiClient(),
		isGuestVisit: demoSession !== undefined,
	}), [store, mode, readinessAxios, demoSession]);

	return (
		<GuestDemoReactContext value={contextValue}>
			{children}
		</GuestDemoReactContext>
	);
};

GuestDemoSessionProvider.displayName = 'GuestDemoSessionProvider';

export { GuestDemoSessionProvider };
export type { GuestDemoSessionProviderProps };

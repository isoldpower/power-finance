import { createStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { startGuestDemoSession } from "../api/index.ts";
import { GUEST_DEMO_SESSION_STORAGE_KEY, PREPARATION_STATUS_ORDER, TOKEN_RENEWAL_MARGIN_MS } from "./config.ts";

import type { StoreApi } from "zustand";
import type { PersistOptions } from "zustand/middleware";
import type { GuestDemoSession } from "../types.ts";
import type { IGuestDemoSessionsRESTApiClient } from "../api/index.ts";
import type { GuestDemoSessionSnapshot, GuestDemoSessionState } from "./types.ts";


interface GuestDemoSessionStoreOptions {
	demoSession: string | null;
	client: IGuestDemoSessionsRESTApiClient;
}

const persistenceStorageConfig: PersistOptions<GuestDemoSessionState, GuestDemoSessionSnapshot> = {
	name: GUEST_DEMO_SESSION_STORAGE_KEY,
	version: 1,
	storage: createJSONStorage(() => sessionStorage),
	partialize: (state) => ({ session: state.session }),
	migrate: (_, version) => {
		throw new Error(`Obsolete persisted state configuration (version: ${version.toString()})`);
	},
};

const isUsableUntilRenewal = (session: GuestDemoSession | null, now: number): session is GuestDemoSession => {
	return session !== null && Date.parse(session.expiresAt) - TOKEN_RENEWAL_MARGIN_MS > now;
};

const createGuestDemoSessionStore = ({
	demoSession,
	client,
}: GuestDemoSessionStoreOptions): StoreApi<GuestDemoSessionState> => {
	const zustandStore = createStore<GuestDemoSessionState>()(persist((setState, getState) => ({
		session: null,
		demoSession,
		status: demoSession === null ? 'ready' : 'preparing',
		enteredEarly: false,
		preparationFailed: false,
		pendingSession: null,
		obtainSession: () => {
			const { session, pendingSession } = getState();

			if (isUsableUntilRenewal(session, Date.now())) {
				return Promise.resolve(session);
			} else if (pendingSession) {
				return pendingSession;
			}

			const startedSession = startGuestDemoSession({ handler: client })
				.then((started) => {
					setState({ session: started });
					return started;
				})
				.finally(() => {
					setState({ pendingSession: null });
				});

			setState({ pendingSession: startedSession });
			return startedSession;
		},
		advancePreparation: (status) => {
			if (PREPARATION_STATUS_ORDER[status] > PREPARATION_STATUS_ORDER[getState().status]) {
				setState({ status });
			}
		},
		enterEarly: () => {
			setState({ enteredEarly: true });
		},
		failPreparation: () => {
			setState({ preparationFailed: true });
		},
		retryPreparation: () => {
			setState({ preparationFailed: false });
		},
	}), persistenceStorageConfig));

	if (isUsableUntilRenewal(zustandStore.getState().session, Date.now())) {
		zustandStore.setState({ status: 'ready' });
	}

	return zustandStore;
};

export { createGuestDemoSessionStore };
export type { GuestDemoSessionStoreOptions };

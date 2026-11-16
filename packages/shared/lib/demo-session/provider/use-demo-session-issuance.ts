import { useCallback, useEffect, useState } from "react";

import { obtainDemoSession } from "../api/index.ts";
import { announceDemoSession } from "../announce-demo-session.ts";
import { readStoredDemoSession } from "../demo-session-storage.ts";

import type { DemoSessionStatus } from "../types.ts";
import type { IDemoSessionsRESTApiClient } from "../api/index.ts";


interface DemoSessionIssuance {
	status: DemoSessionStatus;
	demoSession: string | undefined;
	retry: () => void;
}

interface IssuanceState {
	status: DemoSessionStatus;
	demoSession: string | undefined;
}

const initialState = (requested: boolean): IssuanceState => {
	if (!requested) {
		return { status: 'inactive', demoSession: undefined };
	}

	const stored = readStoredDemoSession(Date.now());

	return stored ? { status: 'ready', demoSession: stored.id } : { status: 'issuing', demoSession: undefined };
};

function useDemoSessionIssuance(requested: boolean, client: IDemoSessionsRESTApiClient): DemoSessionIssuance {
	const [state, setState] = useState<IssuanceState>(() => initialState(requested));
	const [attempt, setAttempt] = useState(0);

	useEffect(() => {
		if (!requested) {
			return;
		}

		let cancelled = false;

		obtainDemoSession(client)
			.then((session) => {
				if (cancelled) {
					return;
				}

				setState({ status: 'ready', demoSession: session.id });
				announceDemoSession(session.id);
			})
			.catch(() => {
				if (!cancelled) {
					setState({ status: 'failed', demoSession: undefined });
				}
			});

		return () => {
			cancelled = true;
		};
	}, [requested, client, attempt]);

	const retry = useCallback(() => {
		setState({ status: 'issuing', demoSession: undefined });
		setAttempt((previous) => previous + 1);
	}, []);

	return { ...state, retry };
}

export { useDemoSessionIssuance };
export type { DemoSessionIssuance };

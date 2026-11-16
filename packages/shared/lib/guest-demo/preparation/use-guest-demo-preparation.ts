import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

import { useGuestDemoContext, useGuestDemoSession } from "../session/index.ts";
import { awaitGuestDemoReadModel } from "./await-guest-demo-read-model.ts";
import { obtainGuestDemoSessionWithRetry } from "./obtain-guest-demo-session-with-retry.ts";


interface GuestDemoPreparationState {
	preparing: boolean;
	failed: boolean;
	retry: () => void;
}

function useGuestDemoPreparation(): GuestDemoPreparationState {
	const { readiness } = useGuestDemoContext();
	const {
		status,
		enteredEarly,
		preparationFailed,
		obtainSession,
		advancePreparation,
		failPreparation,
		retryPreparation,
	} = useGuestDemoSession(
		useShallow((state) => ({
			status: state.status,
			enteredEarly: state.enteredEarly,
			preparationFailed: state.preparationFailed,
			obtainSession: state.obtainSession,
			advancePreparation: state.advancePreparation,
			failPreparation: state.failPreparation,
			retryPreparation: state.retryPreparation,
		}))
	);
	const needsPreparation = status !== 'ready' && !preparationFailed;

	useEffect(() => {
		if (!needsPreparation) {
			return;
		}

		const abortController = new AbortController();
		const finishPreparation = () => {
			if (!abortController.signal.aborted) {
				advancePreparation('ready');
			}
		};
		const markFailed = () => {
			if (!abortController.signal.aborted) {
				failPreparation();
			}
		};

		obtainGuestDemoSessionWithRetry({ obtain: obtainSession, signal: abortController.signal })
			.then(
				(session) => awaitGuestDemoReadModel({
					handler: readiness,
					session,
					signal: abortController.signal,
					onReached: advancePreparation,
				}).then(finishPreparation, finishPreparation),
				markFailed,
			);

		return () => {
			abortController.abort();
		};
	}, [needsPreparation, obtainSession, advancePreparation, failPreparation, readiness]);

	const preparing = status === 'preparing' || (status === 'browsable' && !enteredEarly);

	return { preparing, failed: preparationFailed, retry: retryPreparation };
}

export { useGuestDemoPreparation };
export type { GuestDemoPreparationState };

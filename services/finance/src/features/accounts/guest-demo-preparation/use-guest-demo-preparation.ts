import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { useApiContext } from "@app/api";

import { useGuestDemoSession } from "../guest-demo-session";
import { awaitGuestDemoReadModel } from "./await-guest-demo-read-model.ts";


function useGuestDemoPreparation(): boolean {
	const { guestDemoServers } = useApiContext();
	const { status, enteredEarly, obtainSession, advancePreparation } = useGuestDemoSession(
		useShallow((state) => ({
			status: state.status,
			enteredEarly: state.enteredEarly,
			obtainSession: state.obtainSession,
			advancePreparation: state.advancePreparation,
		}))
	);
	const needsPreparation = status !== 'ready';

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

		obtainSession()
			.then((session) => awaitGuestDemoReadModel({
				handler: guestDemoServers.rest,
				session,
				signal: abortController.signal,
				onReached: advancePreparation,
			}))
			.then(finishPreparation, finishPreparation);

		return () => {
			abortController.abort();
		};
	}, [needsPreparation, obtainSession, advancePreparation, guestDemoServers.rest]);

	return status === 'preparing' || (status === 'browsable' && !enteredEarly);
}

export { useGuestDemoPreparation };

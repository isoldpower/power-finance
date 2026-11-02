import { isGuestDemoReadModelBehind } from "../guest-demo-api";
import { READINESS_SCHEDULE, READINESS_TIMEOUT_MS } from "./config.ts";

import type { GuestDemoSession } from "@entity/accounts";
import type { IGuestDemoReadinessRESTApiClient } from "../guest-demo-api";
import type { GuestDemoPreparationStatus } from "../guest-demo-session";


interface AwaitGuestDemoReadModelRequest {
	handler: Pick<IGuestDemoReadinessRESTApiClient, 'probe'>;
	session: GuestDemoSession;
	signal: AbortSignal;
	onReached: (status: GuestDemoPreparationStatus) => void;
}

function wait(delayMs: number): Promise<void> {
	return new Promise((resolve) => {
		window.setTimeout(resolve, delayMs);
	});
}

async function awaitGuestDemoReadModel(request: AwaitGuestDemoReadModelRequest): Promise<void> {
	const { handler, session, signal, onReached } = request;
	if (session.writeVersion === null) {
		return;
	}

	const deadline = Date.now() + READINESS_TIMEOUT_MS;
	const isWithinBudget = () => !signal.aborted && Date.now() < deadline;

	for (const { probe, pollIntervalMs, reaches } of READINESS_SCHEDULE) {
		while (isWithinBudget() && await isGuestDemoReadModelBehind({
			handler,
			probe,
			writeVersion: session.writeVersion,
		})) {
			await wait(pollIntervalMs);
		}
		if (signal.aborted) {
			return;
		}
		onReached(reaches);
	}
}

export { awaitGuestDemoReadModel };
export type { AwaitGuestDemoReadModelRequest };
